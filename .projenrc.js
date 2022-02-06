const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Dudu (David) Twizer',
  authorAddress: 'dudut@amazon.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-skylight',
  repositoryUrl: 'https://github.com/cdklabs/cdk-skylight.git',
  peerDeps: ['constructs', 'aws-cdk-lib'],
  releaseToNpm: true,
  gitignore: ['.DS_Store'],

  publishToNuget: {
    dotNetNamespace: 'Cdk.Skylight',
    packageId: 'Cdk.Skylight',
  },

  publishToMaven: {
    javaPackage: 'cdk-skylight',
    mavenArtifactId: 'cdk-skylight',
    mavenGroupId: 'cdk-skylight',
    repositoryUrl: 'https://maven.pkg.github.com/cdklabs/cdk-skylight.git',
  },

  publishToPypi: {
    distName: 'cdk-skylight',
    module: 'cdk-skylight',
  },
});

project.synth();
