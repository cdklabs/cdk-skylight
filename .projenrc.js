const { awscdk } = require("projen");
const project = new awscdk.AwsCdkConstructLibrary({
	author: "Dudu (David) Twizer",
	authorAddress: "dudut@amazon.com",
	cdkVersion: "2.1.0",
	defaultReleaseBranch: "main",
	name: "cdk-skylight",
	repositoryUrl: "https://github.com/cdklabs/cdk-skylight.git",
	peerDeps: ["constructs", "aws-cdk-lib"],
	releaseToNpm: true,
	dotnet: {
		dotNetNamespace: "cdk-skylight",
		packageId: "cdk-skylight",
	},
	java: {
		javaPackage: "cdk-skylight",
		mavenArtifactId: "cdk-skylight",
		mavenGroupId: "cdk-skylight",
		repositoryUrl: "https://maven.pkg.github.com/cdklabs/cdk-skylight.git",
	},
	python: {
		distName: "cdk-skylight",
		module: "cdk-skylight",
	},
	// deps: [],                /* Runtime dependencies of this module. */
	// description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
	// devDeps: [],             /* Build dependencies for this module. */
	// packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
