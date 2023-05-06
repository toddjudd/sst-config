import * as ssm from 'aws-cdk-lib';
import { SSTConfig } from 'sst';
import { Config, NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'sst-config',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Goals:
      // 1. Maintain Security!
      // 2. Be able to deploy from Github Actions with minimal or no Env specific Secrets
      // 3. Be able to deploy locally with minimal or no .env files
      // 4. maintain type safety for env vars at compile time.

      // Methods for passing Environment Variables to the Next.js App

      // 1. Read from Process.env into env object (github secrets per env, what to do locally?)
      // 2. Read from SSM Parameter Store into env object (how to pass SSM arn? Local?)

      // Methods for using the SST Config construct for binding values to the Next.js App

      // 3. Read from process.env into Config object (github secrets per env, what to do locally?)
      // 4. Read from SSM Parameter Store into Config object (how to pass SSM arn? Local?)
      // 5. Define Config values in code (programmatically change vars on stack.stage)
      // 6. Define Config Secrets using sst secrets (when does this block the next build?)

      // Methods of delivery
      // 1. NextjsSite {env: {}} object
      // 2. app.addDefaultFunctionEnv({})
      // 3. NextjsSite {bind: []} array only for Config construct
      // 4. app.addDefaultFunctionBinding  only for Config construct

      //1.1.public process.env => nextjs env object
      const NEXT_PUBLIC_ENV_VAR = process.env.NEXT_PUBLIC_ENV_VAR;
      //1.1.secret process.env => nextjs env object
      const SECRET_ENV_VAR = process.env.SECRET_ENV_VAR;

      //1.2.public process.env => app.addDefaultFunctionEnv
      //1.2.secret process.env => app.addDefaultFunctionEnv
      app.addDefaultFunctionEnv({
        NEXT_PUBLIC_APP_DEFAULT_ENV_VAR:
          process.env.NEXT_PUBLIC_APP_DEFAULT_FUNCTION_ENV ||
          'failed to read from .env',
        SECRET_APP_DEFAULT_ENV_VAR:
          process.env.SECRET_APP_DEFAULT_FUNCTION_ENV ||
          'failed to read from .env',
      });

      // skipping ssm for now

      // 3.1.public process.env => Config object => nextjs env object
      const NEXT_PUBLIC_CONFIG_PARAM_ENV = new Config.Parameter(
        stack,
        'NEXT_PUBLIC_CONFIG_PARAM_ENV',
        {
          value: process.env.NEXT_PUBLIC_CONFIG_PARAM_ENV || '',
        }
      );
      // 3.1.secret process.env => Config object => nextjs env object
      const SECRET_CONFIG_PARAM_ENV = new Config.Parameter(
        stack,
        'SECRET_CONFIG_PARAM_ENV',
        {
          value: process.env.SECRET_CONFIG_PARAM_ENV || '',
        }
      );
      // 3.3.public process.env => Config object => next js bind
      const NEXT_PUBLIC_CONFIG_PARAM_BIND = new Config.Parameter(
        stack,
        'NEXT_PUBLIC_CONFIG_PARAM_BIND',
        {
          value: process.env.NEXT_PUBLIC_CONFIG_PARAM_BIND || '',
        }
      );
      // 3.3.secret process.env => Config object => next js bind
      const SECRET_CONFIG_PARAM_BIND = new Config.Parameter(
        stack,
        'SECRET_CONFIG_PARAM_BIND',
        {
          value: process.env.SECRET_CONFIG_PARAM_BIND || '',
        }
      );
      // 3.4.public process.env => Config object => app.functionbind
      const NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND = new Config.Parameter(
        stack,
        'NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND',
        {
          value: process.env.NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND || '',
        }
      );
      // 3.4.secret process.env => Config object => app.functionbind
      const SECRET_CONFIG_PARAM_FUNCTION_BIND = new Config.Parameter(
        stack,
        'SECRET_CONFIG_PARAM_FUNCTION_BIND',
        {
          value: process.env.SECRET_CONFIG_PARAM_FUNCTION_BIND || '',
        }
      );

      // skipping ssm for now

      // 5.1.public Config object => nextjs env object
      const NEXT_PUBLIC_CONFIG_PARAM_ENV_CODE = new Config.Parameter(
        stack,
        'NEXT_PUBLIC_CONFIG_PARAM_ENV_CODE',
        {
          value: 'NEXT_PUBLIC_CONFIG_PARAM_ENV_CODE',
        }
      );
      // 5.1.secret Config object => nextjs env object
      const SECRET_CONFIG_PARAM_ENV_CODE = new Config.Parameter(
        stack,
        'SECRET_CONFIG_PARAM_ENV_CODE',
        {
          value: 'SECRET_CONFIG_PARAM_ENV_CODE',
        }
      );
      // 5.3.public Config object => next js bind
      const NEXT_PUBLIC_CONFIG_PARAM_BIND_CODE = new Config.Parameter(
        stack,
        'NEXT_PUBLIC_CONFIG_PARAM_BIND_CODE',
        {
          value: 'NEXT_PUBLIC_CONFIG_PARAM_BIND_CODE',
        }
      );
      // 5.3.secret Config object => next js bind
      const SECRET_CONFIG_PARAM_BIND_CODE = new Config.Parameter(
        stack,
        'SECRET_CONFIG_PARAM_BIND_CODE',
        {
          value: 'SECRET_CONFIG_PARAM_BIND_CODE',
        }
      );
      // 5.4.public Config object => app.functionbind
      const NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND_CODE = new Config.Parameter(
        stack,
        'NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND_CODE',
        {
          value: 'NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND_CODE',
        }
      );
      // 5.4.secret Config object => app.functionbind
      const SECRET_CONFIG_PARAM_FUNCTION_BIND_CODE = new Config.Parameter(
        stack,
        'SECRET_CONFIG_PARAM_FUNCTION_BIND_CODE',
        {
          value: 'SECRET_CONFIG_PARAM_FUNCTION_BIND_CODE',
        }
      );

      // 6.3.secret Config Secret object => app.functionbind
      const SECRET_CONFIG_SECRET_NEXT_BIND = new Config.Secret(
        stack,
        'SECRET_CONFIG_SECRET_NEXT_BIND'
      );
      //npx sst secrets set --fallback SECRET_CONFIG_SECRET_NEXT_BIND SECRET_CONFIG_SECRET_NEXT_BIND
      //✔  Setting "SECRET_CONFIG_SECRET_NEXT_BIND"
      //✔  Reloaded 1 site

      // 6.4.secret Config Secret object => app.functionbind
      const SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE = new Config.Secret(
        stack,
        'SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE'
      );
      //npx sst secrets set --fallback SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE
      //✔  Setting "SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE"
      //✔  Reloaded 1 site

      app.addDefaultFunctionBinding([
        NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND,
        SECRET_CONFIG_PARAM_FUNCTION_BIND,
        NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND_CODE,
        SECRET_CONFIG_PARAM_FUNCTION_BIND_CODE,
        SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE,
      ]);

      const site = new NextjsSite(stack, 'site', {
        bind: [
          NEXT_PUBLIC_CONFIG_PARAM_BIND,
          SECRET_CONFIG_PARAM_BIND,
          NEXT_PUBLIC_CONFIG_PARAM_BIND_CODE,
          SECRET_CONFIG_PARAM_BIND_CODE,
          SECRET_CONFIG_SECRET_NEXT_BIND,
        ],
        environment: {
          NEXT_PUBLIC_ENV_VAR: NEXT_PUBLIC_ENV_VAR || '',
          SECRET_ENV_VAR: SECRET_ENV_VAR || '',
          NEXT_PUBLIC_CONFIG_PARAM_ENV: NEXT_PUBLIC_CONFIG_PARAM_ENV.toString(),
          SECRET_CONFIG_PARAM_ENV: SECRET_CONFIG_PARAM_ENV.toString(),
          NEXT_PUBLIC_CONFIG_PARAM_ENV_CODE:
            NEXT_PUBLIC_CONFIG_PARAM_ENV_CODE.toString(),
          SECRET_CONFIG_PARAM_ENV_CODE: SECRET_CONFIG_PARAM_ENV_CODE.toString(),
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
