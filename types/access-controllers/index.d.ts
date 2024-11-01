/**
 * @module AccessControllers
 * @description
 * Provides a system for managing access controllers. Supported access
 * controllers can be added and removed from the access controller list, and
 * can load the associated module if they are supported.
 */

import IPFSAccessController from "./ipfs";
import OrbitDBAccessController from "./orbitdb";

/**
 * Represents an access controller module.
 */
interface AccessController {
	/** The type of the access controller. */
	type: string;
	// Additional fields can be added here based on actual implementations.
}

/**
 * Gets an access controller module specified by type.
 * @param type A valid access controller type.
 * @returns The access controller module.
 * @throws Will throw an error if the access controller type is not supported.
 */
declare const getAccessController: (type: string) => AccessController;

/**
 * Adds an access controller module to the list of supported access controllers.
 * @param accessController A compatible access controller module.
 * @throws Will throw an error if the access controller does not contain
 * the required field 'type'.
 * @throws Will throw an error if the access controller type is already added.
 */
declare const useAccessController: (accessController: AccessController) => void;

/**
 * The IPFS access controller module.
 */
export { IPFSAccessController };

/**
 * The OrbitDB access controller module.
 */
export { OrbitDBAccessController };

/**
 * Exports the functions to manage access controllers.
 */
export { getAccessController, useAccessController };
