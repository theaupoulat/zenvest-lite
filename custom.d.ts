declare namespace NodeJS {
  interface ProcessEnv {
    // system
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly VERCEL_ENV: 'development' | 'preview' | 'production';
    readonly VERCEL_URL: string;
    readonly VERCEL_GIT_COMMIT_REF: string;
    // private
    // public
  }
}
