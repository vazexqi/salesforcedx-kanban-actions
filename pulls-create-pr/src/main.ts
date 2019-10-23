import * as core from '@actions/core';
import * as github from '@actions/github';

const INPUT_TOKEN = 'token';
const INPUT_OWNER = 'owner';
const INPUT_REPO = 'repo';
const INPUT_TITLE = 'title';
const INPUT_BODY = 'body';
const INPUT_HEAD = 'head';
const INPUT_BASE = 'base';

async function run() {
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
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
