export type Deployment = {
  uid: string;
  name: string;
  url: string;
  created: number;
  source: string;
  state: string;
  readySubstate: string;
  type: string;
  creator: {
    uid: string;
    email: string;
    username: string;
    githubLogin: string;
  };
  inspectorUrl: string;
  meta: {
    githubCommitAuthorName: string;
    githubCommitMessage: string;
    githubCommitOrg: string;
    githubCommitRef: string;
    githubCommitRepo: string;
    githubCommitSha: string;
    githubDeployment: string;
    githubOrg: string;
    githubRepo: string;
    githubRepoOwnerType: string;
    githubCommitRepoId: string;
    githubRepoId: string;
    githubRepoVisibility: string;
    githubCommitAuthorLogin: string;
    branchAlias: string;
  };
  target: string;
  aliasError: null;
  aliasAssigned: number;
  isRollbackCandidate: boolean;
  createdAt: number;
  buildingAt: number;
  ready: number;
  projectSettings: {
    commandForIgnoringBuildStep: null;
  };
};
