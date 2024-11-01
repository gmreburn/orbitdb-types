import { CID } from "multiformats/cid";
import { IPFS } from "ipfs-core-types";
import {
	ComposedStorage,
	IPFSBlockStorage,
	LRUStorage,
} from "./storage/index.js";

/**
 * Module for interacting with a manifest storage system using IPFS and an LRU cache.
 * Provides methods for creating, retrieving, and closing access to the manifest storage.
 *
 * @module ManifestStore
 */

type Manifest = {
	/**
	 * Name of the manifest, describing its purpose or content.
	 */
	name: string;

	/**
	 * Type of the manifest, specifying the intended usage.
	 */
	type: string;

	/**
	 * Address of the access controller, which manages permissions.
	 */
	accessController: string;

	/**
	 * Additional metadata, if any, associated with the manifest.
	 */
	meta?: Record<string, any>;
};

type ManifestCreationResult = {
	/**
	 * The hash representing the CID of the manifest, encoded in base58btc.
	 */
	hash: string;

	/**
	 * The created manifest object.
	 */
	manifest: Manifest;
};

type ManifestStoreConfig = {
	/**
	 * IPFS instance used for storing and retrieving IPFS content.
	 */
	ipfs?: IPFS;

	/**
	 * Storage instance used to manage content locally.
	 */
	storage?: ComposedStorage;
};

/**
 * Creates a new instance of the ManifestStore.
 *
 * @param config - Configuration for the manifest store, including optional IPFS instance and storage.
 * @returns An instance of the ManifestStore.
 */
declare function ManifestStore(
	config?: ManifestStoreConfig
): Promise<ManifestStoreInstance>;

/**
 * Interface for a ManifestStore instance.
 */
interface ManifestStoreInstance {
	/**
	 * Retrieves a manifest by its address from storage.
	 *
	 * @param address - The CID or hash address of the manifest.
	 * @returns The manifest object if found, or null if not.
	 */
	get(address: CID | string): Promise<Manifest | null>;

	/**
	 * Creates a new manifest and stores it in the storage.
	 *
	 * @param manifestData - Details required for creating the manifest.
	 * @returns An object containing the hash and created manifest.
	 * @throws Will throw an error if required fields (name, type, or accessController) are missing.
	 */
	create(manifestData: Manifest): Promise<ManifestCreationResult>;

	/**
	 * Closes the manifest store and releases any resources.
	 */
	close(): Promise<void>;
}

export default ManifestStore;
