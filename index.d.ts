/// <reference types="react" />
/// <reference lib="dom" />
import { Event } from "@white-matrix/event-emitter";

declare module chainide {
  type FileType = "-" | "d";

  interface IStat {
    /**
     * Each field has two character positions(only for Regular file):
        1. If r, the file is only readable;
        2. If w, the file is read and writable;
     */
    permissions?: string;
    mtime: number;
    // ctime: number;
    // size: number;
  }

  interface ICreateOption {
    overwrite?: boolean;
    force?: boolean; // if parent not exist, then create parent then create
  }

  interface IFilesystemChangeEffect {
    moved?: { src: string; dest: string };
    added?: string;
    deleted?: string;
  }

  interface IFilesystemSandboxChangeEffect {
    addedUri?: string;
    deletedUri?: string;
    updatedUri?: string;
    mTime?: number;
  }

  enum FilesystemIndexChangeDetailType {
    LOAD,
    ADDED,
    DELETED,
    CLEAR,
  }

  interface IFilesystemIndexChangeDetail {
    type: FilesystemIndexChangeDetailType;
    list: string[];
  }

  interface IFilesystemIndex {
    indexes: string[];
    detail: IFilesystemIndexChangeDetail;
  }

  interface IFilesystemContentChange {
    uri: string;
  }

  interface IFileSystemService {
    readonly onFilesystemDidChange: Event<IFilesystemChangeEffect>;
    readonly onFileIndex: Event<IFilesystemIndex>;
    readonly onFileContentChange: Event<IFilesystemContentChange>;

    getAllPathByRegex(uri: string, regex: string): Promise<string[]>;

    openSync(uri: string): void;
    closeSync(uri: string): void;
    stat(uri: string): Promise<IStat | null>;
    mkdir(uri: string): Promise<void>;
    getFilesystemIndex(uri: string): Promise<string[]>;
    download(uri: string, filename: string): Promise<void>;
    delete(uri: string): Promise<void>;

    copy(fromUri: string, toUri: string): Promise<string>;
    move(fromUri: string, toUri: string): Promise<string>;
    rename(fromUri: string, name: string): Promise<string>;
    readFile(uri: string): Promise<File | null>;
    writeFile(uri: string, file: File): Promise<void>;
    readFileString(uri: string): Promise<string | null>;
    readSurfaceDirectory(uri: string): Promise<string[] | null>;
    writeFileString(uri: string, content: string): Promise<void>;
    // this content will be cached when create
    createFileString(uri: string, content: string): Promise<void>;
  }

  interface ICommand {
    id: string;
    name: string;
    callback: <T>(data?: T) => void;
  }

  interface IFunction {
    name: string;
    function: Function;
  }

  type IPluginStorage = any;

  interface ExtensionProperty {
    active: () => void;
    dispose: () => void;
  }

  interface PluginContext {
    subscriptions: ExtensionProperty[];
  }

  export enum ComponentPosition {
    LEFT = "left",
    BOTTOM = "bottom",
    RIGHT = "right",
    CENTER = "center",
    WELCOME = "welcome",
  }

  interface IBaseExtensionComponent {
    componentId: string;
    position: ComponentPosition;
    componentFunc: () => JSX.Element | JSX.Element[] | null;
  }

  interface IControlComponent extends IBaseExtensionComponent {
    position: typeof ComponentPosition.RIGHT;
    name: string;
    iconName: string;
  }

  interface IWelcomeComponent extends IBaseExtensionComponent {
    position: typeof ComponentPosition.WELCOME;
  }

  interface IBottomComponent extends IBaseExtensionComponent {
    position: typeof ComponentPosition.BOTTOM;
  }

  type IAddControlComponent = Omit<IControlComponent, "position">;

  type ISetWelcomeComponent = Omit<IWelcomeComponent, "position">;

  type ISetBottomComponent = Omit<IBottomComponent, "position">;

  type IExtensionComponent =
    | IControlComponent
    | IBottomComponent
    | IWelcomeComponent;

  interface ProjectBindPluginsConfig {
    currentProjectId: string | null;
    pluginsConfigs: any;
  }

  interface IChainIdeProxyImpl {
    addControl: (data: IAddControlComponent) => ExtensionProperty;
    setWelcomePage: (data: ISetWelcomeComponent) => ExtensionProperty;
    registerCommand: (data: Omit<ICommand, "id">) => ExtensionProperty;
    setWalletView: (
      data: ISetBottomComponent,
      cb?: () => void
    ) => ExtensionProperty;
    registerFunction: (data: IFunction, cb?: () => void) => ExtensionProperty;
    getApiFunction: (name: string) => Function | undefined;
    addModule: (modulename: string, state: any) => void;
    fileSystemService: IFileSystemService;
    currentProject: ProjectBindPluginsConfig;
  }
}

export = chainide;
