const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Dudu (David) Twizer',
  authorAddress: 'dudut@amazon.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-skylight',
  repositoryUrl: 'https://github.com/cdklabs/cdk-skylight.git',
  peerDeps: ['constructs', 'aws-cdk-lib'],
  gitignore: ['.DS_Store'],
  autoApproveUpgrades: true,
  autoMerge: true,
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },

  releaseToNpm: true,
  majorVersion: 1.0,

  // publishToNuget: {
  //   dotNetNamespace: 'Cdklabs.Skylight',
  //   packageId: 'Cdklabs.Skylight',
  // },

  // publishToMaven: {
  //   javaPackage: 'io.github.cdklabs.skylight',
  //   mavenEndpoint: 'https://s01.oss.sonatype.org',
  //   mavenArtifactId: 'cdk-skylight',
  //   mavenGroupId: 'io.github.cdklabs',
  // },

  publishToPypi: {
    distName: 'cdk-skylight',
    module: 'cdk_skylight',
  },
});

project.synth();
