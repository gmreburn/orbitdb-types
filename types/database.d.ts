/// <reference types="node" />
import { EventEmitter } from "events";
import { IPFS } from "helia";
import { Identity } from "orbit-db-identity-provider";
// import PQueue from "p-queue";
import Sync from "./key-store.js";
import { Log, Entry } from "./oplog/index.js";
import {
	ComposedStorage,
	LRUStorage,
	IPFSBlockStorage,
	LevelStorage,
} from "./storage/index.js";
import { AccessController } from "./access-controller/index.js";

/**
 * @module Database
 * @description
 * Database is the base class for OrbitDB data stores and handles all lower
 * level add operations and database syncing using IPFS.
 */

interface DatabaseParams {
	/** An IPFS instance */
	ipfs: IPFS;
	/** An Identity instance */
	identity?: Identity;
	/** The address of the database */
	address?: string;
	/** The name of the database */
	name?: string;
	/** An AccessController instance */
	access?: AccessController;
	/** A location for storing Database-related data. Defaults to './orbitdb/[params.address]' */
	directory?: string;
	/** The database's metadata */
	meta?: Record<string, any>;
	/** Storage instance for storing log heads. Defaults to ComposedStorage */
	headsStorage?: typeof ComposedStorage;
	/** Storage instance for storing log entries. Defaults to ComposedStorage */
	entryStorage?: typeof ComposedStorage;
	/** Storage instance for storing an index of log entries. Defaults to ComposedStorage */
	indexStorage?: typeof ComposedStorage;
	/** Maximum distance between references to other entries. Defaults to 16 */
	referencesCount?: number;
	/** Sync databases automatically if true. Defaults to false */
	syncAutomatically?: boolean;
	/** Callback fired when an entry is added to the oplog */
	onUpdate?: (log: Log, entry: Entry) => Promise<void>;
}

/**
 * @namespace Database
 * @description The instance returned by Database function.
 */
interface DatabaseInstance {
	/** The address of the database */
	address: string;
	/** The name of the database */
	name: string;
	/** The identity instance */
	identity?: Identity;
	/** Metadata for the database */
	meta: Record<string, any>;
	/** Closes the database, stopping sync and closing the oplog */
	close(): Promise<void>;
	/** Drops the database, clearing the oplog */
	drop(): Promise<void>;
	/** Adds an operation to the oplog */
	addOperation(op: any): Promise<string>;
	/** The underlying operations log of the database */
	log: Log;
	/** Sync instance of the database */
	sync: Sync;
	/** Set of currently connected peers */
	peers: Set<string>;
	/** Event emitter that emits database changes */
	events: EventEmitter;
	/** Access controller instance of the database */
	access?: AccessController;
}

/**
 * Creates an instance of Database.
 * @function
 * @param {DatabaseParams} params - Configuration parameters for the Database instance.
 * @returns {Promise<DatabaseInstance>} A promise that resolves to a Database instance.
 */
declare function Database(params: DatabaseParams): Promise<DatabaseInstance>;

export default Database;
