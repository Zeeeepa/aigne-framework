import { expect, spyOn, test } from "bun:test";
import { createAIGNECommand } from "@aigne/cli/commands/aigne.js";

test("aigne command should parse --version correctly", async () => {
  const command = createAIGNECommand();

  spyOn(process, "exit").mockReturnValueOnce(0 as never);

  const result = await command.parse(["--version"]);

  expect(result).toEqual(
    expect.objectContaining({
      version: true,
    }),
  );
});

test("aigne command should print help if no any subcommand", async () => {
  const command = createAIGNECommand();

  const exit = spyOn(process, "exit").mockReturnValue(undefined as never);
  spyOn(console, "error")
    .mockReturnValue(undefined as never)
    .mockRestore();
  const log = spyOn(console, "error").mockReturnValue(undefined as never);

  await command.parseAsync([]);

  expect(log.mock.calls).toMatchSnapshot();

  exit.mockRestore();
  log.mockRestore();
});
