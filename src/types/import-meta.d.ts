interface ImportMeta {
  webpackContext: (
    req: string,
    options?: {
      recursive?: boolean
      regExp?: RegExp
      mode?: 'sync' | 'eager' | 'lazy' | 'lazy-once' | 'weak'
    }
  ) => __WebpackModuleApi.RequireContext;
  webpackHot?: {
    accept(deps?: string | string[], callback?: (updated?: any) => void): void
    dispose(callback: (data: unknown) => void): void
  }
}