"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const INPUT_FROMCOLUMNID = 'fromColumnId';
const INPUT_FROMCOLUMNNAME = 'fromColumnName';
const INPUT_TOCOLUMNID = 'toColumnId';
const INPUT_TOCOLUMNNAME = 'toColumnName';
const OUTPUT_ISMATCH = 'isMatch';
const TOKEN = 'token';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fromColumnId = core.getInput(INPUT_FROMCOLUMNID);
            const fromColumnName = core.getInput(INPUT_FROMCOLUMNNAME);
            const toColumnId = core.getInput(INPUT_TOCOLUMNID);
            const toColumnName = core.getInput(INPUT_TOCOLUMNNAME);
            core.debug(`fromColumnId: ${fromColumnId}`);
            core.debug(`fromColumnName: ${fromColumnName}`);
            core.debug(`toColumnId: ${toColumnId}`);
            core.debug(`toColumnName: ${toColumnName}`);
            const myToken = core.getInput(TOKEN);
            const octokit = new github.GitHub(myToken);
            const fromColumn = yield octokit.projects.getColumn({
                column_id: fromColumnId
            });
            if (fromColumn.data.name.toUpperCase() !== fromColumnName.toUpperCase()) {
                core.debug(`${fromColumnName.toUpperCase()} doesn't match with ${fromColumn.data.name.toUpperCase}`);
                core.setOutput(OUTPUT_ISMATCH, 'false');
                return;
            }
            const toColumn = yield octokit.projects.getColumn({
                column_id: toColumnId
            });
            if (toColumn.data.name.toUpperCase() !== toColumnName.toUpperCase()) {
                core.debug(`${toColumnName.toUpperCase()} doesn't match with ${toColumn.data.name.toUpperCase}`);
                core.setOutput(OUTPUT_ISMATCH, 'false');
                return;
            }
            core.setOutput(OUTPUT_ISMATCH, 'true');
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
