import { useCallback, useEffect, useState } from "react";
import { Account } from "starknet";
import { BurnerConnector } from "..";
import { BurnerManager } from "../manager/burnerManager";
import { Burner } from "../types";

/**
 * A React hook that takes the Burner Manager object avoiding the React Context.
 * Useful for building apps without React Context.
 *
 * @returns An object with utility methods and properties.
 */
export const useBurnerManager = ({
    burnerManager,
}: {
    burnerManager: BurnerManager; // Accepts the BurnerManager class as an parameter
}) => {
    if (!burnerManager.masterAccount) {
        throw new Error("BurnerManagerClass must be provided");
    }
    if (!burnerManager.isInitialized) {
        throw new Error("BurnerManagerClass must be intialized");
    }

    // State to manage the current active account.
    const [account, setAccount] = useState<Account | null>(null);
    const [count, setCount] = useState(0);
    const [isDeploying, setIsDeploying] = useState(false);

    // On mount, set the active account and count the number of burners.
    // burnerManager has to be initialized before the component mounts
    useEffect(() => {
        (async () => {
            setAccount(burnerManager.getActiveAccount());
            setCount(burnerManager.list().length);
        })();
    }, []);

    /**
     * Lists all the burners available in the storage.
     *
     * @returns An array of Burner accounts.
     */
    const list = useCallback((): Burner[] => {
        return burnerManager.list();
    }, [count]);

    /**
     * Selects and sets a burner as the active account.
     *
     * @param address - The address of the burner account to set as active.
     */
    const select = useCallback(
        (address: string): void => {
            burnerManager.select(address);
            setAccount(burnerManager.getActiveAccount());
        },
        [burnerManager]
    );

    /**
     * Retrieves a burner account based on its address.
     *
     * @param address - The address of the burner account to retrieve.
     * @returns The Burner account corresponding to the provided address.
     */
    const get = useCallback(
        (address: string): Account => {
            return burnerManager.get(address);
        },
        [burnerManager]
    );

    /**
     * Clears a burner account based on its address.
     *
     * @param address - The address of the burner account to retrieve.
     * @returns The Burner account corresponding to the provided address.
     */
    const clear = useCallback(() => {
        burnerManager.clear();
        setCount(0);
    }, [burnerManager]);

    /**
     * Creates a new burner account and sets it as the active account.
     *
     * @returns A promise that resolves to the newly created Burner account.
     */
    const create = useCallback(async (): Promise<Account> => {
        burnerManager.setIsDeployingCallback(setIsDeploying);
        const newAccount = await burnerManager.create();
        setAccount(newAccount);
        setCount((prev) => prev + 1);
        return newAccount;
    }, [burnerManager]);

    /**
     * Generates a list of BurnerConnector instances for each burner account. These can be added to Starknet React.
     *
     * @returns An array of BurnerConnector instances.
     */
    const listConnectors = useCallback((): BurnerConnector[] => {
        // Retrieve all the burners.
        const burners = list();

        // Map each burner to its respective BurnerConnector instance.
        return burners.map((burner) => {
            return new BurnerConnector(
                {
                    id: burner.address,
                    name: "Dojo Burner",
                },
                get(burner.address),
                burnerManager.provider
            );
        });
    }, [burnerManager.isDeploying]);

    /**
     * Copy burners to clipboard
     */
    const copyToClipboard = useCallback(async () => {
        await burnerManager.copyBurnersToClipboard();
    }, [burnerManager]);

    /**
     * Set burners from clipboard
     */
    const applyFromClipboard = useCallback(async () => {
        await burnerManager.setBurnersFromClipboard();
        setAccount(burnerManager.getActiveAccount());
        setCount(burnerManager.list().length);
    }, [burnerManager]);

    return {
        get,
        list,
        select,
        create,
        listConnectors,
        clear,
        account,
        isDeploying,
        count,
        copyToClipboard,
        applyFromClipboard,
    };
};
