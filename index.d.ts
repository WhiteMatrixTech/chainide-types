import { AnyAction, Middleware } from "redux";
import * as React from "react";

declare module chainide {
  const version = "0.0.1";
  /**
   * ChainIDE API Proxy
   */
  interface IProxy {
    redux: {
      /**
       * Plugin interface for external developers to implement the logic
       */
      addModule(pluginId: string, reduxModule: plugin.IReduxModule): void;
    };

    views: {
      /**
       * add a left panel view to ChainIDE
       * @param pluginId plugin ID
       * @param panelName the panel name to be displayed
       * @param component the Reaction Component of the panel to be rendered
       * @return {string} componentId
       */
      addLeftPanel(
        pluginId: string,
        panelName: string,
        component: React.Component | Function
      ): string;

      /**
       * add a left panel view to ChainIDE
       * @param pluginId plugin ID
       * @param component the Reaction Component of the file tab to be rendered
       * @return {string} componentId
       */
      addFileTab(
        pluginId: string,
        component: React.Component | Function
      ): string;

      /**
       * add a left panel view to ChainIDE
       * @param pluginId plugin ID
       * @param component the Reaction Component of the file tab to be rendered
       * @return {string} componentId
       */
      addLeftSideButton(
        pluginId: string,
        panelName: string,
        icon: JSX.Element
      ): string;
    };

    /**
     * All selectors
     */
    selectors: {
      /**
       * Get entile file tree
       * @return {any} It returns the whole file tree
       * TODO: Replace any with filetree interface
       */
      getFileTree(state: any): any;
    };

    registerApiFunction(
      pluginId: string,
      functionName: string,
      callable: Function
    ): void;

    getApiFunction<T>(functionName: string): T;

    /**
     * Proxy test function
     */
    testEcho(input: string): string;
  }
  interface IAction {
    type: string;
    data: any;
  }

  namespace editor {
    namespace model {
      interface IExtensionFileTabItem {
        name: string;
        id: string;
        opened: boolean;
        componentId: string;
        pluginId: string;
      }
    }
    namespace actions {
      interface IPanesOpenFileTab extends IAction {
        type: "OPEN_FILE";
        data: editor.model.IExtensionFileTabItem;
      }
    }
  }

  namespace plugin {
    /**
     * Plugin interface for external developers to implement the logic
     */
    interface IPlugin {
      /**
       * return a globally unique plugin ID for ChainIDE to identify the plugin
       */
      getPluginId(): string;

      /**
       * the initialization method for the plugin
       */
      load(ChainIdeProxyImpl: IProxy): void;

      /**
       * unload the resources to be cleaned up
       */
      unload(): void;
    }

    /**
     * Redux Module interface
     */
    export interface IReduxModule {
      /**
       * Reducers for the module
       */
      reducerMap?: any;
      /**
       * Middlewares to add to the store
       */
      middlewares?: Middleware[];
      /**
       * These actions are dispatched immediately after adding the module in the store
       */
      initialActions?: AnyAction[];
      /**
       * These actions are dispatched immediatly before removing the module from the store
       */
      finalActions?: AnyAction[];
      /**
       * Specifies if the module is retained forever in the store
       */
      retained?: boolean;
    }
  }
}
export = chainide;
