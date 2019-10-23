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
const INPUT_TOKEN = 'token';
const INPUT_OWNER = 'owner';
const INPUT_REPO = 'repo';
const INPUT_TITLE = 'title';
const INPUT_BODY = 'body';
const INPUT_HEAD = 'head';
const INPUT_BASE = 'base';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const owner = core.getInput(INPUT_OWNER);
            const repo = core.getInput(INPUT_REPO);
            const title = core.getInput(INPUT_TITLE);
            const body = core.getInput(INPUT_BODY);
            const head = core.getInput(INPUT_HEAD);
            const base = core.getInput(INPUT_BASE);
            const token = core.getInput(INPUT_TOKEN);
            const octokit = new github.GitHub(token);
            octokit.pulls.create({
                owner: owner,
                repo: repo,
                title: title,
                body: body,
                head: head,
                base: base
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
