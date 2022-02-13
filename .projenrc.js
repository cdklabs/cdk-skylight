const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Dudu (David) Twizer',
  authorAddress: 'dudut@amazon.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-skylight',
  repositoryUrl: 'https://github.com/cdklabscdk-skylight.git',
  peerDeps: ['constructs', 'aws-cdk-lib'],
  gitignore: ['.DS_Store'],

  releaseToNpm: true,

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

  // publishToPypi: {
  //   distName: 'cdk-skylight',
  //   module: 'cdk_skylight',
  // },
});

project.synth();
