declare module "@orbitdb/core" {
	export { default as createOrbitDB } from "./orbitdb";

	// export { Documents, Events, useDatabaseType } from "./databases";

	export { isValidAddress, parseAddress } from "./address";

	// export { Log, Entry, DefaultAccessController } from "./oplog";

	// export { default as Database } from "./database";

	export { default as KeyStore } from "./key-store";

	// export {
	//   useAccessController,
	//   IPFSAccessController,
	//   OrbitDBAccessController,
	// } from "./access-controllers";

	// export {
	//   Identities,
	//   isIdentity,
	//   useIdentityProvider,
	//   PublicKeyIdentityProvider,
	// } from "./identities";

	// export {
	//   IPFSBlockStorage,
	//   LevelStorage,
	//   LRUStorage,
	//   MemoryStorage,
	//   ComposedStorage,
	// } from "./storage";
}
