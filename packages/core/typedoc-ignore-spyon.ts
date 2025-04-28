import type { Application, Context, Reflection } from "typedoc";
import {
  EmitHint,
  NewLineKind,
  type Node,
  ScriptKind,
  ScriptTarget,
  type Statement,
  createPrinter,
  createSourceFile,
  factory,
  isCallExpression,
} from "typescript";

const IGNORE_EXPRESSIONS = ["spyOn"];

export function load(app: Application) {
  // @ts-ignore can not resolve `on` method of `converter` in `typedoc`
  app.converter.on("resolveReflection", (_: Context, reflection: Reflection) => {
    if (!reflection.comment) return;

    const exampleTags = reflection.comment.getTags("@example");

    for (const tag of exampleTags) {
      for (const content of tag.content) {
        if (content.kind === "code") {
          const code = content.text
            .trim()
            .replace(/^\s*```\S+/, "")
            .replace(/```$/, "");

          const c = removeFunctionCallsFromCode(code, IGNORE_EXPRESSIONS);
          content.text = `\`\`\`ts\n${c}\n\`\`\``;
        }
      }
    }
  });
}

function removeFunctionCallsFromCode(sourceCode: string, functionName: string[]): string {
  const sourceFile = createSourceFile(
    "temp.ts",
    sourceCode,
    ScriptTarget.Latest,
    true,
    ScriptKind.TS,
  );

  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
  });
  const statements: Statement[] = [];

  sourceFile.forEachChild((node) => {
    let shouldRemove = false;

    function check(node: Node) {
      if (isCallExpression(node)) {
        const expressionText = node.expression.getText();
        if (functionName.includes(expressionText)) {
          shouldRemove = true;
        }
      }
      node.forEachChild(check);
    }

    check(node);

    if (!shouldRemove) {
      statements.push(node as Statement);
    }
  });

  const newSourceFile = factory.updateSourceFile(sourceFile, statements);

  return statements
    .map((statement) => printer.printNode(EmitHint.Unspecified, statement, newSourceFile))
    .join("\n\n")
    .trim();
}
