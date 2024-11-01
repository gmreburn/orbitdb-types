import { IPFS } from "ipfs-core";
import { Log, Entry } from "./log"; // Assuming Log and Entry are defined elsewhere
import { PeerId } from "libp2p";
import { EventEmitter } from "events";

/**
 * Callback function invoked after a peer's heads have been received.
 * @param peerId - The PeerID of the peer who provided the heads.
 * @param heads - Array of log entries received.
 */
export type OnSynced = (peerId: PeerId, heads: Entry[]) => void;

/**
 * Sync configuration options.
 */
export interface SyncOptions {
	/**
	 * An IPFS instance for Sync operations.
	 */
	ipfs: IPFS;
	/**
	 * The log instance to synchronize.
	 */
	log: Log;
	/**
	 * Event emitter for managing 'join', 'leave', and 'error' events.
	 */
	events?: EventEmitter;
	/**
	 * Callback invoked when heads are received from a peer.
	 */
	onSynced?: OnSynced;
	/**
	 * Whether to start syncing automatically. Defaults to true.
	 */
	start?: boolean;
	/**
	 * Timeout for Sync operations in milliseconds. Defaults to 30000.
	 */
	timeout?: number;
}

/**
 * Sync instance returned by the Sync factory function.
 */
export interface SyncInstance {
	/**
	 * Adds a log entry to be synchronized with peers.
	 * @param entry - The log entry to add.
	 */
	add(entry: Entry): Promise<void>;
	/**
	 * Starts the Sync Protocol.
	 */
	start(): Promise<void>;
	/**
	 * Stops the Sync Protocol.
	 */
	stop(): Promise<void>;
	/**
	 * Event emitter for sync-related events.
	 */
	events: EventEmitter;
	/**
	 * Set of peer IDs currently connected to the Sync Protocol.
	 */
	peers: Set<string>;
}

/**
 * Creates a Sync instance for synchronizing logs between multiple peers.
 *
 * The Sync Protocol for OrbitDB synchronizes database operations
 * between multiple peers. When started, a peer subscribes to a pubsub topic
 * of the log's ID. Peers connected to this topic exchange the log heads,
 * ensuring synchronized local state.
 *
 * @param params - Configuration options for the Sync Protocol.
 * @returns An instance of the Sync Protocol.
 */
declare function Sync(params: SyncOptions): Promise<SyncInstance>;

export default Sync;
