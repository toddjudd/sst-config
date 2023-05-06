import { NextApiRequest, NextApiResponse } from 'next';
import { Config } from 'sst/node/config';
const config = {
  nextjsenv: {
    NEXT_PUBLIC_ENV_VAR: process.env.NEXT_PUBLIC_ENV_VAR,
    SECRET_ENV_VAR: process.env.SECRET_ENV_VAR,

    NEXT_PUBLIC_APP_DEFAULT_FUNCTION_ENV:
      process.env.NEXT_PUBLIC_APP_DEFAULT_FUNCTION_ENV,

    SECRET_APP_DEFAULT_FUNCTION_ENV:
      process.env.SECRET_APP_DEFAULT_FUNCTION_ENV,

    // stage-sst-config-Site/NEXT_PUBLIC_CONFIG_PARAM_ENV
    NEXT_PUBLIC_CONFIG_PARAM_ENV: process.env.NEXT_PUBLIC_CONFIG_PARAM_ENV,

    // stage-sst-config-Site/SECRET_CONFIG_PARAM_ENV
    SECRET_CONFIG_PARAM_ENV: process.env.SECRET_CONFIG_PARAM_ENV,

    NEXT_PUBLIC_CONFIG_PARAM_BIND: process.env.NEXT_PUBLIC_CONFIG_PARAM_BIND,

    SECRET_CONFIG_PARAM_BIND: process.env.SECRET_CONFIG_PARAM_BIND,

    NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND:
      process.env.NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND,

    SECRET_CONFIG_PARAM_FUNCTION_BIND:
      process.env.SECRET_CONFIG_PARAM_FUNCTION_BIND,
  },
  nextbind: {
    // Everything here is available in the function
    NEXT_PUBLIC_CONFIG_PARAM_BIND: Config.NEXT_PUBLIC_CONFIG_PARAM_BIND,

    SECRET_CONFIG_PARAM_BIND: Config.SECRET_CONFIG_PARAM_BIND,

    NEXT_PUBLIC_CONFIG_PARAM_BIND_CODE:
      Config.NEXT_PUBLIC_CONFIG_PARAM_BIND_CODE,

    SECRET_CONFIG_PARAM_BIND_CODE: Config.SECRET_CONFIG_PARAM_BIND_CODE,

    SECRET_CONFIG_SECRET_NEXT_BIND: Config.SECRET_CONFIG_SECRET_NEXT_BIND,
  },
  functionbind: {
    // Nothing here is available in the function
    // NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND:
    //   Config.NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND,
    // SECRET_CONFIG_PARAM_FUNCTION_BIND: Config.SECRET_CONFIG_PARAM_FUNCTION_BIND,
    // NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND_CODE:
    //   Config.NEXT_PUBLIC_CONFIG_PARAM_FUNCTION_BIND_CODE,
    // SECRET_CONFIG_PARAM_FUNCTION_BIND_CODE:
    //   Config.SECRET_CONFIG_PARAM_FUNCTION_BIND_CODE,
    // SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE:
    //   Config.SECRET_CONFIG_SECRET_FUNCTION_BIND_CODE,
  },
  functionenv: {
    // Nothing here is returned
    NEXT_PUBLIC_APP_DEFAULT_ENV_VAR:
      process.env.NEXT_PUBLIC_APP_DEFAULT_ENV_VAR,

    SECRET_APP_DEFAULT_ENV_VAR: process.env.SECRET_APP_DEFAULT_ENV_VAR,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(config);
}
