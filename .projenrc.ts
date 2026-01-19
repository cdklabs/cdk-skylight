import { CdklabsConstructLibrary, JsiiLanguage } from 'cdklabs-projen-project-types';

const project = new CdklabsConstructLibrary({
  name: 'cdk-skylight',
  private: false,
  repositoryUrl: 'https://github.com/cdklabs/cdk-skylight.git',
  projenrcTs: true,
  defaultReleaseBranch: 'main',
  author: 'Dudu (David) Twizer',
  authorAddress: 'dudut@amazon.com',

  cdkVersion: '2.32.0',
  rosettaOptions: {
    strict: false, // should be true, pls investigate and fix rosetta errors
  },

  enablePRAutoMerge: true,
  setNodeEngineVersion: false,
  peerDeps: ['constructs', 'aws-cdk-lib'],
  gitignore: ['.DS_Store'],

  majorVersion: 1.0,
  releaseToNpm: true,
  jsiiTargetLanguages: [JsiiLanguage.PYTHON],
  publishToPypi: {
    distName: 'cdk-skylight',
    module: 'cdk_skylight',
  },

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
});

project.synth();
