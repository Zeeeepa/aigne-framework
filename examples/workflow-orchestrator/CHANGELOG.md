# Changelog

## [1.9.2](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.9.1...example-workflow-orchestrator-v1.9.2) (2025-05-15)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/agent-library bumped to 1.8.1
    * @aigne/cli bumped to 1.9.1
    * @aigne/core bumped to 1.15.0

## [1.9.1](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.9.0...example-workflow-orchestrator-v1.9.1) (2025-05-12)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/agent-library bumped to 1.8.0
    * @aigne/cli bumped to 1.9.0
    * @aigne/core bumped to 1.14.0
  * devDependencies
    * @aigne/test-utils bumped to 0.2.0

## [1.9.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.8.0...example-workflow-orchestrator-v1.9.0) (2025-04-30)


### Features

* **core:** add BedrockChatModel support ([#101](https://github.com/AIGNE-io/aigne-framework/issues/101)) ([a0b98f0](https://github.com/AIGNE-io/aigne-framework/commit/a0b98f01bd78a135232226548848fa35a64982d1))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/agent-library bumped to 1.7.1
    * @aigne/cli bumped to 1.8.1
    * @aigne/core bumped to 1.13.0

## [1.8.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.7.3...example-workflow-orchestrator-v1.8.0) (2025-04-27)


### Features

* support TeamAgent and finalize API naming ([#91](https://github.com/AIGNE-io/aigne-framework/issues/91)) ([033d1b6](https://github.com/AIGNE-io/aigne-framework/commit/033d1b6a7dc5460807476abb35a413ba89a2a664))
* **tests:** add @aigne/test-utils and update example test cases ([#95](https://github.com/AIGNE-io/aigne-framework/issues/95)) ([6be48d1](https://github.com/AIGNE-io/aigne-framework/commit/6be48d1895e990f68c4978018da1a53bb58c1c6d))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/agent-library bumped to 1.7.0
    * @aigne/cli bumped to 1.8.0
    * @aigne/core bumped to 1.12.0
  * devDependencies
    * @aigne/test-utils bumped to 0.1.0

## [1.7.3](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.7.2...example-workflow-orchestrator-v1.7.3) (2025-04-23)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/agent-library bumped to 1.6.1
    * @aigne/cli bumped to 1.7.0
    * @aigne/core bumped to 1.11.0

## [1.7.2](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.7.1...example-workflow-orchestrator-v1.7.2) (2025-04-22)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/cli bumped to 1.6.0

## [1.7.1](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.7.0...example-workflow-orchestrator-v1.7.1) (2025-04-22)


### Bug Fixes

* use bunwrapper launch examples ([#79](https://github.com/AIGNE-io/aigne-framework/issues/79)) ([55022e2](https://github.com/AIGNE-io/aigne-framework/commit/55022e20bb253bac608dad3024600da91e093a69))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @aigne/cli bumped to 1.5.1

## [1.7.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.6.1...example-workflow-orchestrator-v1.7.0) (2025-04-22)


### Features

* add agent library support ([#51](https://github.com/AIGNE-io/aigne-framework/issues/51)) ([1f0d34d](https://github.com/AIGNE-io/aigne-framework/commit/1f0d34ddda3154283a4bc958ddb9b68b4ac106b0))
* add OrchestratorAgent in agent library ([25a5e9e](https://github.com/AIGNE-io/aigne-framework/commit/25a5e9e6c60d747c8bf484ac884b31dc02c14757))
* add TerminalTracer for better UX in terminal ([#56](https://github.com/AIGNE-io/aigne-framework/issues/56)) ([9875a5d](https://github.com/AIGNE-io/aigne-framework/commit/9875a5d46abb55073340ffae841fed6bd6b83ff4))
* **ci:** support coverage examples with model matrix ([#59](https://github.com/AIGNE-io/aigne-framework/issues/59)) ([1edd704](https://github.com/AIGNE-io/aigne-framework/commit/1edd70426b80a69e3751b2d5fe818297711d0777))
* **cli:** support model and download customization for aigne run ([#61](https://github.com/AIGNE-io/aigne-framework/issues/61)) ([51f6619](https://github.com/AIGNE-io/aigne-framework/commit/51f6619e6c591a84f1f2339b26ef66d89fa9486e))
* **core:** add ChatModelClaude to use models of anthropic ([#30](https://github.com/AIGNE-io/aigne-framework/issues/30)) ([0a62a64](https://github.com/AIGNE-io/aigne-framework/commit/0a62a6499e3da723a4646e67952051708ce7de6a))
* **core:** add support for subscribing topics for agent memory ([#28](https://github.com/AIGNE-io/aigne-framework/issues/28)) ([eeecc67](https://github.com/AIGNE-io/aigne-framework/commit/eeecc67049a60ebcc4cdba0fbcd987b3d81f4af6))


### Bug Fixes

* **dx:** export models/utils in submodules ([#43](https://github.com/AIGNE-io/aigne-framework/issues/43)) ([bd561b3](https://github.com/AIGNE-io/aigne-framework/commit/bd561b397de816f04c2d63d58538e81fba82fc7f))
* **orchestrator:** refactor and enhance orchestrator with step synthesis ([#31](https://github.com/AIGNE-io/aigne-framework/issues/31)) ([ba9fca0](https://github.com/AIGNE-io/aigne-framework/commit/ba9fca04fad71d49c8f4f52172b56668a94ea714))
* remove usage of new Node.js exists API for compatibility ([#57](https://github.com/AIGNE-io/aigne-framework/issues/57)) ([c10cc08](https://github.com/AIGNE-io/aigne-framework/commit/c10cc086d8ecd0744f38cdb1367d4c8816b723b3))
* rename @aigne/core-next to @aigne/core ([3a81009](https://github.com/AIGNE-io/aigne-framework/commit/3a8100962c81813217b687ae28e8de604419c622))

## [1.6.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.5.0...example-workflow-orchestrator-v1.6.0) (2025-04-17)


### Features

* **ci:** support coverage examples with model matrix ([#59](https://github.com/AIGNE-io/aigne-framework/issues/59)) ([1edd704](https://github.com/AIGNE-io/aigne-framework/commit/1edd70426b80a69e3751b2d5fe818297711d0777))
* **cli:** support model and download customization for aigne run ([#61](https://github.com/AIGNE-io/aigne-framework/issues/61)) ([51f6619](https://github.com/AIGNE-io/aigne-framework/commit/51f6619e6c591a84f1f2339b26ef66d89fa9486e))

## [1.5.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.4.0...example-workflow-orchestrator-v1.5.0) (2025-04-15)


### Features

* add TerminalTracer for better UX in terminal ([#56](https://github.com/AIGNE-io/aigne-framework/issues/56)) ([9875a5d](https://github.com/AIGNE-io/aigne-framework/commit/9875a5d46abb55073340ffae841fed6bd6b83ff4))


### Bug Fixes

* remove usage of new Node.js exists API for compatibility ([#57](https://github.com/AIGNE-io/aigne-framework/issues/57)) ([c10cc08](https://github.com/AIGNE-io/aigne-framework/commit/c10cc086d8ecd0744f38cdb1367d4c8816b723b3))

## [1.4.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.3.2...example-workflow-orchestrator-v1.4.0) (2025-04-08)


### Features

* add agent library support ([#51](https://github.com/AIGNE-io/aigne-framework/issues/51)) ([1f0d34d](https://github.com/AIGNE-io/aigne-framework/commit/1f0d34ddda3154283a4bc958ddb9b68b4ac106b0))

## [1.3.2](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.3.1...example-workflow-orchestrator-v1.3.2) (2025-03-27)


### Bug Fixes

* **dx:** export models/utils in submodules ([#43](https://github.com/AIGNE-io/aigne-framework/issues/43)) ([bd561b3](https://github.com/AIGNE-io/aigne-framework/commit/bd561b397de816f04c2d63d58538e81fba82fc7f))

## [1.3.1](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.3.0...example-workflow-orchestrator-v1.3.1) (2025-03-26)


### Bug Fixes

* **orchestrator:** refactor and enhance orchestrator with step synthesis ([#31](https://github.com/AIGNE-io/aigne-framework/issues/31)) ([ba9fca0](https://github.com/AIGNE-io/aigne-framework/commit/ba9fca04fad71d49c8f4f52172b56668a94ea714))

## [1.3.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.2.0...example-workflow-orchestrator-v1.3.0) (2025-03-24)


### Features

* **core:** add ChatModelClaude to use models of anthropic ([#30](https://github.com/AIGNE-io/aigne-framework/issues/30)) ([0a62a64](https://github.com/AIGNE-io/aigne-framework/commit/0a62a6499e3da723a4646e67952051708ce7de6a))
* **core:** add support for subscribing topics for agent memory ([#28](https://github.com/AIGNE-io/aigne-framework/issues/28)) ([eeecc67](https://github.com/AIGNE-io/aigne-framework/commit/eeecc67049a60ebcc4cdba0fbcd987b3d81f4af6))


### Bug Fixes

* rename @aigne/core-next to @aigne/core ([3a81009](https://github.com/AIGNE-io/aigne-framework/commit/3a8100962c81813217b687ae28e8de604419c622))

## [1.2.0](https://github.com/AIGNE-io/aigne-framework/compare/example-workflow-orchestrator-v1.1.0...example-workflow-orchestrator-v1.2.0) (2025-03-18)


### Features

* add OrchestratorAgent in agent library ([25a5e9e](https://github.com/AIGNE-io/aigne-framework/commit/25a5e9e6c60d747c8bf484ac884b31dc02c14757))
