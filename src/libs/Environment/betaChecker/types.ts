import type { SemVer } from 'semver'

type IsBetaBuild = Promise<boolean>

type EnvironmentCheckerModule = {
	isBeta: () => IsBetaBuild
}

type GithubReleaseJSON = {
	tag_name: string | SemVer
}

export type { IsBetaBuild, EnvironmentCheckerModule, GithubReleaseJSON }
