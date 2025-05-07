import { z } from "zod";
import { ensVideoSchema } from "@ensvolution/video-components/schemas";

export const nick: z.infer<typeof ensVideoSchema> = {
  ensName: 'nick.eth',
  profileStates: [
    {
      "id": 0,
      "timestamp": "2019-11-18T23:03:13.000Z",
      "transactionHash": "0xf9a8f60a5b3a1cc42c4432d1983e72564f40f64dbe75a17fa288c83f690b711b",
      "blockNumber": "8959086",
      "name": "nick.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0x226159d592e2b063810a10ebf6dcbada94ed68b8"
      },
      "resolverAddress": "0x226159d592e2b063810a10ebf6dcbada94ed68b8",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 1,
      "timestamp": "2019-11-18T23:04:06.000Z",
      "transactionHash": "0xa8a13a6e76b236aedbdcf04d1f4bcd3a010b0d92d4dbb5e47f364280835280f2",
      "blockNumber": "8959091",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        }
      ],
      "resolverAddress": "0x226159d592e2b063810a10ebf6dcbada94ed68b8",
      "eventType": "addr",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "60",
            "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
            "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 2,
      "timestamp": "2020-02-04T08:03:15.000Z",
      "transactionHash": "0x7c2fcd11c646293b5c0e9ba23df2fcc07e6aa09e492ae4a4d11d4577c8182495",
      "blockNumber": "9414911",
      "name": "nick.eth",
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        }
      ],
      "resolverChange": {
        "address": "0x226159d592e2b063810a10ebf6dcbada94ed68b8"
      },
      "resolverAddress": "0x226159d592e2b063810a10ebf6dcbada94ed68b8",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 3,
      "timestamp": "2021-06-15T21:15:59.000Z",
      "transactionHash": "0xd0ab3dda8c30ac352fed5c65cfd0de1a26e11fbd307f23018198935a9402cd6a",
      "blockNumber": "12641467",
      "name": "nick.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41"
      },
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 4,
      "timestamp": "2021-06-15T21:22:33.000Z",
      "transactionHash": "0x33d02e8602e1e04686144dedc4ae2b05693bf0424493439f790bc6e889aa9b36",
      "blockNumber": "12641504",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://pbs.twimg.com/profile_images/1387515448543956993/5ADaybu__400x400.jpg",
          "rawValue": "https://pbs.twimg.com/profile_images/1387515448543956993/5ADaybu__400x400.jpg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://pbs.twimg.com/profile_images/1387515448543956993/5ADaybu__400x400.jpg",
          "rawValue": "https://pbs.twimg.com/profile_images/1387515448543956993/5ADaybu__400x400.jpg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "multi",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "60",
            "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
            "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
          },
          {
            "type": "text",
            "key": "email",
            "value": "arachnid@notdot.net",
            "rawValue": "arachnid@notdot.net"
          },
          {
            "type": "text",
            "key": "url",
            "value": "https://ens.domains/",
            "rawValue": "https://ens.domains/"
          },
          {
            "type": "text",
            "key": "avatar",
            "value": "https://pbs.twimg.com/profile_images/1387515448543956993/5ADaybu__400x400.jpg",
            "rawValue": "https://pbs.twimg.com/profile_images/1387515448543956993/5ADaybu__400x400.jpg"
          },
          {
            "type": "text",
            "key": "com.twitter",
            "value": "nicksdjohnson",
            "rawValue": "nicksdjohnson"
          },
          {
            "type": "text",
            "key": "com.github",
            "value": "arachnid",
            "rawValue": "arachnid"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 5,
      "timestamp": "2021-09-30T19:55:00.000Z",
      "transactionHash": "0xd8225732803833b4c8ad13d479bd2f70bd2cf7c05dd66ec23c8d44facf158004",
      "blockNumber": "13329060",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "text",
            "key": "avatar",
            "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
            "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 6,
      "timestamp": "2021-11-05T20:03:24.000Z",
      "transactionHash": "0x25e8b859f85f1da672ef5d430af70a0bc6913004887eda04f0a9641622e8f8db",
      "blockNumber": "13558625",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "com.discord",
            "value": "nickjohnson#9532",
            "rawValue": "nickjohnson#9532"
          },
          {
            "type": "text",
            "key": "eth.ens.delegate",
            "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
            "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 7,
      "timestamp": "2021-11-10T02:53:29.000Z",
      "transactionHash": "0xeab2bd1544bdc0c82975f7def548216b796bb4eaa0cf85ec6aed07948b2f3f41",
      "blockNumber": "13585953",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "",
          "rawValue": ""
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": [
          {
            "type": "text",
            "key": "eth.ens.delegate",
            "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
            "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
          }
        ]
      }
    },
    {
      "id": 8,
      "timestamp": "2021-11-14T22:41:35.000Z",
      "transactionHash": "0xae84a7ba2caf8d60976b1ab5284894c52d02bed5cf38fab81823d5f4849f86bf",
      "blockNumber": "13616706",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9/nick.eth"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9/nick.eth"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "snapshot",
            "value": "ipns://storage.snapshot.page/registry/0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9/nick.eth",
            "rawValue": "ipns://storage.snapshot.page/registry/0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9/nick.eth"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 9,
      "timestamp": "2021-11-14T22:55:18.000Z",
      "transactionHash": "0xf51ab7b6ce5bc0b7a328dc32ea967ee5a5f2b0d3f0fd52652a1cf5a5e6a00eb2",
      "blockNumber": "13616762",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "text",
            "key": "snapshot",
            "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
            "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 10,
      "timestamp": "2021-11-15T05:59:57.000Z",
      "transactionHash": "0x7184392bd7694455dba4819d660c18d3ccf0a9858c3ecc0e6a59a16f7e45183f",
      "blockNumber": "13618645",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "eth.ens.delegate",
            "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
            "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 11,
      "timestamp": "2021-12-12T20:13:17.000Z",
      "transactionHash": "0x814895f3b5db52fba32e6509aa4067c738e8dc29296ebd5d28491a75738708e8",
      "blockNumber": "13792437",
      "name": "nick.eth",
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#9532",
          "rawValue": "nickjohnson#9532"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        }
      ],
      "resolverChange": {
        "address": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41"
      },
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 12,
      "timestamp": "2022-02-16T21:05:34.000Z",
      "transactionHash": "0xb9046f1f9460dd3d5db3e65a8e0f4784516fba14939a8e007aead64728fa46d1",
      "blockNumber": "14219499",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#0001",
          "rawValue": "nickjohnson#0001"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#0001",
          "rawValue": "nickjohnson#0001"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "text",
            "key": "com.discord",
            "value": "nickjohnson#0001",
            "rawValue": "nickjohnson#0001"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 13,
      "timestamp": "2022-08-11T20:07:50.000Z",
      "transactionHash": "0xf04c3810a5ffbfa7ec142ea7f4fb0d261ae9286686cb3e8abecdf18a9cf29822",
      "blockNumber": "15322694",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "description",
          "value": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him.",
          "rawValue": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him."
        },
        {
          "type": "text",
          "key": "com.reddit",
          "value": "nickjohnson",
          "rawValue": "nickjohnson"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#0001",
          "rawValue": "nickjohnson#0001"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him.",
          "rawValue": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him."
        },
        {
          "type": "text",
          "key": "com.reddit",
          "value": "nickjohnson",
          "rawValue": "nickjohnson"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "description",
            "value": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him.",
            "rawValue": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him."
          },
          {
            "type": "text",
            "key": "com.reddit",
            "value": "nickjohnson",
            "rawValue": "nickjohnson"
          },
          {
            "type": "text",
            "key": "org.telegram",
            "value": "nicksdjohnson",
            "rawValue": "nicksdjohnson"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 14,
      "timestamp": "2022-12-12T21:51:11.000Z",
      "transactionHash": "0xa3f7a4d6fcbb897b731cf99a3ef64fa82b20278feb93cf52845e2d181400b61a",
      "blockNumber": "16171421",
      "name": "nick.eth",
      "currentUpdatedRecords": [
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgccx524mfjv7znyfsa6g013o6v4yvis9dxnrjbwojc62pt0430",
          "rawValue": "0xe5010172002408011220066e20f72cc583d769bc8df5fedff24942b3b8941e827f023d306bdc7aecf5ac"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5",
          "rawValue": "0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5"
        },
        {
          "type": "text",
          "key": "email",
          "value": "arachnid@notdot.net",
          "rawValue": "arachnid@notdot.net"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://ens.domains/",
          "rawValue": "https://ens.domains/"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://i.seadn.io/gae/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE?w=500&auto=format",
          "rawValue": "eip155:1/erc1155:0x495f947276749ce646f68ac8c248420045cb7b5e/8112316025873927737505937898915153732580103913704334048512380490797008551937"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "arachnid",
          "rawValue": "arachnid"
        },
        {
          "type": "text",
          "key": "com.discord",
          "value": "nickjohnson#0001",
          "rawValue": "nickjohnson#0001"
        },
        {
          "type": "text",
          "key": "snapshot",
          "value": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth",
          "rawValue": "ipns://storage.snapshot.page/registry/0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5/nick.eth"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/716"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him.",
          "rawValue": "Lead developer of ENS & Ethereum Foundation alum. Certified rat tickler. he/him."
        },
        {
          "type": "text",
          "key": "com.reddit",
          "value": "nickjohnson",
          "rawValue": "nickjohnson"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "nicksdjohnson",
          "rawValue": "nicksdjohnson"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgccx524mfjv7znyfsa6g013o6v4yvis9dxnrjbwojc62pt0430",
          "rawValue": "0xe5010172002408011220066e20f72cc583d769bc8df5fedff24942b3b8941e827f023d306bdc7aecf5ac"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "contentHash",
      "changes": {
        "added": [
          {
            "type": "contentHash",
            "key": "ipns",
            "value": "ipns://k51qzi5uqu5dgccx524mfjv7znyfsa6g013o6v4yvis9dxnrjbwojc62pt0430",
            "rawValue": "0xe5010172002408011220066e20f72cc583d769bc8df5fedff24942b3b8941e827f023d306bdc7aecf5ac"
          }
        ],
        "updated": [],
        "deleted": []
      }
    }
  ],
  resolverNames: [{
    resolverAddress: "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
    contractName: "PublicResolver"
  }, {
    resolverAddress: "0x226159d592e2b063810a10ebf6dcbada94ed68b8",
    contractName: "PublicResolver"
  }],
}
