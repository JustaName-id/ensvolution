import { z } from "zod";
import { ensVideoSchema } from "@ensvolution/video-components/schemas";

export const slobo: z.infer<typeof ensVideoSchema> = {
  ensName: 'slobo.eth',
  profileStates: [
    {
      "id": 0,
      "timestamp": "2021-09-12T03:05:30.000Z",
      "transactionHash": "0x44b168ae18b29abe0c674c56f49e0166813d26c33497ea29cc97a2e5fa60a584",
      "blockNumber": "13208408",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverChange": {
        "address": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41"
      },
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "addr",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 1,
      "timestamp": "2021-11-04T17:44:00.000Z",
      "transactionHash": "0x029c3ea00095053f0a5aa6e78424eb3bee8bc8561514ffbb733416242726aece",
      "blockNumber": "13551625",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "avatar",
            "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
            "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
          },
          {
            "type": "text",
            "key": "com.twitter",
            "value": "@AlexSlobodnik",
            "rawValue": "@AlexSlobodnik"
          },
          {
            "type": "text",
            "key": "eth.ens.delegate",
            "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
            "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 2,
      "timestamp": "2022-02-17T05:43:08.000Z",
      "transactionHash": "0xd816fcde239bbc4722bbe8b4c7a43ed9782f26ec231952ff74bfdf5143545e04",
      "blockNumber": "14221816",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "https://github.com/aslobodnik",
          "rawValue": "https://github.com/aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "@superslobo",
          "rawValue": "@superslobo"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "https://github.com/aslobodnik",
          "rawValue": "https://github.com/aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "@superslobo",
          "rawValue": "@superslobo"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "email",
            "value": "alex@nftychat.xyz",
            "rawValue": "alex@nftychat.xyz"
          },
          {
            "type": "text",
            "key": "com.github",
            "value": "https://github.com/aslobodnik",
            "rawValue": "https://github.com/aslobodnik"
          },
          {
            "type": "text",
            "key": "org.telegram",
            "value": "@superslobo",
            "rawValue": "@superslobo"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 3,
      "timestamp": "2022-07-25T19:11:12.000Z",
      "transactionHash": "0xbf53d5e8a035c1f104b9116d5462b22b2ada9ddd4ec8ec766c23fa68c11b7513",
      "blockNumber": "15213498",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "contentHash",
          "key": "ipfs",
          "value": "https://ipfs.io/ipfs/bafybeic2rex22oc5xpb5gos4hxqblszpr6v6whnqxphkzqkodqtm7v62zy",
          "rawValue": "0xe301017012205a892fad385dbbc3d33a5c3de015cb2f8fabeb1db0bbceacc14e1c26cfd7dace"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "https://github.com/aslobodnik",
          "rawValue": "https://github.com/aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "@superslobo",
          "rawValue": "@superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipfs",
          "value": "https://ipfs.io/ipfs/bafybeic2rex22oc5xpb5gos4hxqblszpr6v6whnqxphkzqkodqtm7v62zy",
          "rawValue": "0xe301017012205a892fad385dbbc3d33a5c3de015cb2f8fabeb1db0bbceacc14e1c26cfd7dace"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "contentHash",
      "changes": {
        "added": [
          {
            "type": "contentHash",
            "key": "ipfs",
            "value": "https://ipfs.io/ipfs/bafybeic2rex22oc5xpb5gos4hxqblszpr6v6whnqxphkzqkodqtm7v62zy",
            "rawValue": "0xe301017012205a892fad385dbbc3d33a5c3de015cb2f8fabeb1db0bbceacc14e1c26cfd7dace"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 4,
      "timestamp": "2022-08-04T22:36:28.000Z",
      "transactionHash": "0x6590fb29086eec25dc1f19b765577c4c965cd57f0075b71ee8cb6681291e4899",
      "blockNumber": "15278553",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "contentHash",
          "key": "ipfs",
          "value": "https://ipfs.io/ipfs/k51qzi5uqu5dlrut2s5hvootzig3u53le9xatph9y15a2i3oavwh75v73ffl8l",
          "rawValue": "0xe3010172002408011220e04fdd1e13471ab81e11a0580495c25fd5f48d4d99395869a8562aad46cfa445"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "https://github.com/aslobodnik",
          "rawValue": "https://github.com/aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "@superslobo",
          "rawValue": "@superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipfs",
          "value": "https://ipfs.io/ipfs/k51qzi5uqu5dlrut2s5hvootzig3u53le9xatph9y15a2i3oavwh75v73ffl8l",
          "rawValue": "0xe3010172002408011220e04fdd1e13471ab81e11a0580495c25fd5f48d4d99395869a8562aad46cfa445"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "contentHash",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "contentHash",
            "key": "ipfs",
            "value": "https://ipfs.io/ipfs/k51qzi5uqu5dlrut2s5hvootzig3u53le9xatph9y15a2i3oavwh75v73ffl8l",
            "rawValue": "0xe3010172002408011220e04fdd1e13471ab81e11a0580495c25fd5f48d4d99395869a8562aad46cfa445"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 5,
      "timestamp": "2022-08-24T23:04:55.000Z",
      "transactionHash": "0x4cd0017639987337aea595bf5988bbff3411ac38d8db0cc18d8bded6d5c63b1d",
      "blockNumber": "15405687",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "https://github.com/aslobodnik",
          "rawValue": "https://github.com/aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "@superslobo",
          "rawValue": "@superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "contentHash",
      "changes": {
        "added": [
          {
            "type": "contentHash",
            "key": "ipns",
            "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
            "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 6,
      "timestamp": "2022-08-29T19:53:58.000Z",
      "transactionHash": "0x9e6f4f62c908a2255759564e4ab6e5e4255b751a8d26398e71d3186bb1be00a9",
      "blockNumber": "15436043",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "@AlexSlobodnik",
          "rawValue": "@AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "https://github.com/aslobodnik",
          "rawValue": "https://github.com/aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "@superslobo",
          "rawValue": "@superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "greg_is_awesome",
            "value": "True",
            "rawValue": "True"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 7,
      "timestamp": "2022-10-09T10:59:11.000Z",
      "transactionHash": "0xa1917bc649ff07855a5775eba567f15671c7ff37da4dea7eaf8e8a7c3f67579a",
      "blockNumber": "15710096",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "text",
            "key": "com.twitter",
            "value": "AlexSlobodnik",
            "rawValue": "AlexSlobodnik"
          },
          {
            "type": "text",
            "key": "com.github",
            "value": "aslobodnik",
            "rawValue": "aslobodnik"
          },
          {
            "type": "text",
            "key": "org.telegram",
            "value": "superslobo",
            "rawValue": "superslobo"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 8,
      "timestamp": "2023-03-09T22:02:35.000Z",
      "transactionHash": "0xfc80b1790c270ffdba5605f54b45b9e8c2d2608094b654ea0862213a94e1754a",
      "blockNumber": "16793482",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "dm.nftychat",
            "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 9,
      "timestamp": "2023-04-04T17:14:47.000Z",
      "transactionHash": "0x726cf5d42f1862045d8b4e8f6c92640842b8f86f0ddeedb013dd5352c07c1d54",
      "blockNumber": "16976925",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "network.dm3.profile",
            "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
            "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 10,
      "timestamp": "2023-08-07T22:07:47.000Z",
      "transactionHash": "0x666d1c659ecf7438d9d9b12a5ef4d6c1ea541eed88aba4a11da1a92b23ac5472",
      "blockNumber": "17865929",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "hopes.dreams",
            "value": "namestone serves more than 10,000,000 names",
            "rawValue": "namestone serves more than 10,000,000 names"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 11,
      "timestamp": "2023-09-22T18:06:11.000Z",
      "transactionHash": "0x5bffd57a402ac6aa7837a242cdf37ffb74f5a00267a5727810553856a5d79847",
      "blockNumber": "18193052",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@nftychat.xyz",
          "rawValue": "alex@nftychat.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "addr",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "2147483658",
            "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 12,
      "timestamp": "2023-09-22T18:12:23.000Z",
      "transactionHash": "0xabca9ba224b83cd9db26f768dd2a7ab5d7aa7541a8ce70e83dd55bbc77a0ca6b",
      "blockNumber": "18193083",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "text",
            "key": "email",
            "value": "alex@namestone.xyz",
            "rawValue": "alex@namestone.xyz"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 13,
      "timestamp": "2024-02-25T22:02:59.000Z",
      "transactionHash": "0x88d5d71a82122298b4f090b9653eccabf9d41ea4a2b125ec1c25b49170c1968a",
      "blockNumber": "19307449",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0x828ec5bde537b8673af98d77bcb275ae1ca26d1f"
      },
      "resolverAddress": "0x828ec5bde537b8673af98d77bcb275ae1ca26d1f",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 14,
      "timestamp": "2024-02-25T22:12:23.000Z",
      "transactionHash": "0xf8131d1dd58fb9e34718ea9546c965ac1d0940d17984efa6859214dc7a2d532b",
      "blockNumber": "19307496",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "ccip.context",
          "value": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi",
          "rawValue": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "text",
          "key": "ccip.context",
          "value": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi",
          "rawValue": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi"
        }
      ],
      "resolverAddress": "0x828ec5bde537b8673af98d77bcb275ae1ca26d1f",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "ccip.context",
            "value": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi",
            "rawValue": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 15,
      "timestamp": "2024-02-25T22:41:23.000Z",
      "transactionHash": "0x1f4d99c2876666ea88b5f02bdbd5a280b5466860a8979772e3efe5879de13132",
      "blockNumber": "19307640",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "text",
          "key": "ccip.context",
          "value": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi",
          "rawValue": "0xd00d726b2aD6C81E894DC6B87BE6Ce9c5572D2cd https://raffy.xyz/tog/multi"
        },
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0x828ec5bde537b8673af98d77bcb275ae1ca26d1f",
      "eventType": "addr",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "60",
            "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 16,
      "timestamp": "2024-02-26T01:40:23.000Z",
      "transactionHash": "0xdd10625defdf92a2b51903f1cddf6b373ec637d619084c6388fbcf3b0e36de4c",
      "blockNumber": "19308528",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0x231b0ee14048e9dccd1d247744d114a4eb5e8e63"
      },
      "resolverAddress": "0x231b0ee14048e9dccd1d247744d114a4eb5e8e63",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 17,
      "timestamp": "2024-02-26T01:41:23.000Z",
      "transactionHash": "0x763f89581264d76e8c2585725b839b1dc3ae5ed1b00d9e229a896b7d76b1e723",
      "blockNumber": "19308533",
      "name": "slobo.eth",
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
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
      "id": 18,
      "timestamp": "2024-04-09T16:36:59.000Z",
      "transactionHash": "0x90eb5e48439420b731a83adeab8b89a63f2db8b31aeaff4ccbecc2908189be79",
      "blockNumber": "19619317",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "2147525809",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "addr",
          "key": "2147525809",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "addr",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "2147525809",
            "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 19,
      "timestamp": "2024-05-14T20:09:23.000Z",
      "transactionHash": "0x1c8e821867d33758e18afa0ad60d3861a904dccbabd512fe1d72414512a75753",
      "blockNumber": "19870511",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "location",
          "value": "📍nyc",
          "rawValue": "📍nyc"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://namestone.xyz/",
          "rawValue": "https://namestone.xyz/"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Founder NameStone | 5x ENS Steward",
          "rawValue": "Founder NameStone | 5x ENS Steward"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "addr",
          "key": "2147525809",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "location",
          "value": "📍nyc",
          "rawValue": "📍nyc"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://namestone.xyz/",
          "rawValue": "https://namestone.xyz/"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Founder NameStone | 5x ENS Steward",
          "rawValue": "Founder NameStone | 5x ENS Steward"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "location",
            "value": "📍nyc",
            "rawValue": "📍nyc"
          },
          {
            "type": "text",
            "key": "url",
            "value": "https://namestone.xyz/",
            "rawValue": "https://namestone.xyz/"
          },
          {
            "type": "text",
            "key": "description",
            "value": "Founder NameStone | 5x ENS Steward",
            "rawValue": "Founder NameStone | 5x ENS Steward"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 20,
      "timestamp": "2024-06-03T17:03:11.000Z",
      "transactionHash": "0x0195726983441285829067855049f4e7f5993bcecc15b0c7a6207b2ab53d64aa",
      "blockNumber": "20012661",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "farcaster",
          "value": "https://warpcast.com/slobo.eth",
          "rawValue": "https://warpcast.com/slobo.eth"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "addr",
          "key": "2147525809",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "location",
          "value": "📍nyc",
          "rawValue": "📍nyc"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://namestone.xyz/",
          "rawValue": "https://namestone.xyz/"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Founder NameStone | 5x ENS Steward",
          "rawValue": "Founder NameStone | 5x ENS Steward"
        },
        {
          "type": "text",
          "key": "farcaster",
          "value": "https://warpcast.com/slobo.eth",
          "rawValue": "https://warpcast.com/slobo.eth"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [
          {
            "type": "text",
            "key": "farcaster",
            "value": "https://warpcast.com/slobo.eth",
            "rawValue": "https://warpcast.com/slobo.eth"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 21,
      "timestamp": "2024-06-17T19:44:11.000Z",
      "transactionHash": "0xa4593945198b5d51831e5f02e3c4dd96ec464b0e0a70f9cbc665e8305269e7de",
      "blockNumber": "20113668",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0xd17347fa0a6eec89a226c96a9ae354f785e94241"
      },
      "resolverAddress": "0xd17347fa0a6eec89a226c96a9ae354f785e94241",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 22,
      "timestamp": "2024-06-17T19:46:23.000Z",
      "transactionHash": "0xd193e83dfda1a14638b92e75700fdb5984fb65ff70ef7ed387455b9cfd913b57",
      "blockNumber": "20113679",
      "name": "slobo.eth",
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "addr",
          "key": "2147525809",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "location",
          "value": "📍nyc",
          "rawValue": "📍nyc"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://namestone.xyz/",
          "rawValue": "https://namestone.xyz/"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Founder NameStone | 5x ENS Steward",
          "rawValue": "Founder NameStone | 5x ENS Steward"
        },
        {
          "type": "text",
          "key": "farcaster",
          "value": "https://warpcast.com/slobo.eth",
          "rawValue": "https://warpcast.com/slobo.eth"
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
      "id": 23,
      "timestamp": "2024-06-19T23:13:23.000Z",
      "transactionHash": "0xac936213fa0f9f90e18a5c29fbd66ef12888e50032110a52fc09f438f11bb5cb",
      "blockNumber": "20128993",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "text",
          "key": "farcaster",
          "value": "slobo.eth",
          "rawValue": "slobo.eth"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "avatar",
          "value": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg",
          "rawValue": "https://raw.githubusercontent.com/aslobodnik/profile/main/pic.jpeg"
        },
        {
          "type": "text",
          "key": "com.twitter",
          "value": "AlexSlobodnik",
          "rawValue": "AlexSlobodnik"
        },
        {
          "type": "text",
          "key": "eth.ens.delegate",
          "value": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626",
          "rawValue": "https://discuss.ens.domains/t/ens-dao-delegate-applications/815/626"
        },
        {
          "type": "text",
          "key": "email",
          "value": "alex@namestone.xyz",
          "rawValue": "alex@namestone.xyz"
        },
        {
          "type": "text",
          "key": "com.github",
          "value": "aslobodnik",
          "rawValue": "aslobodnik"
        },
        {
          "type": "text",
          "key": "org.telegram",
          "value": "superslobo",
          "rawValue": "superslobo"
        },
        {
          "type": "contentHash",
          "key": "ipns",
          "value": "ipns://k51qzi5uqu5dgy3sm0mt2t99wknt1y3xj8o7e2rzjzqdttb0c3fh8ohuamnm0x",
          "rawValue": "0xe50101720024080112201eaaaebdd99c9043da22fb507cbf7d582c6a655d78eb2a53ab34a9ef997d2d41"
        },
        {
          "type": "text",
          "key": "greg_is_awesome",
          "value": "True",
          "rawValue": "True"
        },
        {
          "type": "text",
          "key": "dm.nftychat",
          "value": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "https://nftychat.xyz/dm/0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF"
        },
        {
          "type": "text",
          "key": "network.dm3.profile",
          "value": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}",
          "rawValue": "data:application/json,{\"profile\":{\"deliveryServices\":[\"beta-ds.dm3.eth\"],\"publicEncryptionKey\":\"J8/l2afGhfNZ+2NKUCD8LO0vtMvOLFXfEmTDIPcUATk=\",\"publicSigningKey\":\"bMv5OHgengNCfcelx6BjsOnYW04VsC38Y+Eof+M5wBI=\"},\"signature\":\"0xad123787c0a5feaf68d013748de51707935a04fffbb842ebe83e81048810ff4465833453b31498a3d080490278377fa2eba2a15e47ac612df7bdb4d19065dd071b\"}"
        },
        {
          "type": "text",
          "key": "hopes.dreams",
          "value": "namestone serves more than 10,000,000 names",
          "rawValue": "namestone serves more than 10,000,000 names"
        },
        {
          "type": "addr",
          "key": "2147483658",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "addr",
          "key": "2147525809",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        },
        {
          "type": "text",
          "key": "location",
          "value": "📍nyc",
          "rawValue": "📍nyc"
        },
        {
          "type": "text",
          "key": "url",
          "value": "https://namestone.xyz/",
          "rawValue": "https://namestone.xyz/"
        },
        {
          "type": "text",
          "key": "description",
          "value": "Founder NameStone | 5x ENS Steward",
          "rawValue": "Founder NameStone | 5x ENS Steward"
        },
        {
          "type": "text",
          "key": "farcaster",
          "value": "slobo.eth",
          "rawValue": "slobo.eth"
        }
      ],
      "resolverAddress": "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41",
      "eventType": "text",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "text",
            "key": "farcaster",
            "value": "slobo.eth",
            "rawValue": "slobo.eth"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 24,
      "timestamp": "2024-06-25T16:23:47.000Z",
      "transactionHash": "0x46da7046b5aad51b948be7151c8af923cf01c214680ada0e5ec8eccd603a9bb2",
      "blockNumber": "20169869",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0xd17347fa0a6eec89a226c96a9ae354f785e94241"
      },
      "resolverAddress": "0xd17347fa0a6eec89a226c96a9ae354f785e94241",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 25,
      "timestamp": "2024-07-03T16:47:59.000Z",
      "transactionHash": "0xd2f17ae511e944baf62bfc99f6d65cabfb55f651f3c9df428ba6b03e3a4efd62",
      "blockNumber": "20227272",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0x2291053f49cd008306b92f84a61c6a1bc9b5cb65"
      },
      "resolverAddress": "0x2291053f49cd008306b92f84a61c6a1bc9b5cb65",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 26,
      "timestamp": "2024-07-03T16:56:11.000Z",
      "transactionHash": "0xcaa93c26c18cc441589ee9ab5ceb5a41b47a2eb518a60ab7377d68920af42338",
      "blockNumber": "20227313",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0xd17347fa0a6eec89a226c96a9ae354f785e94241"
      },
      "resolverAddress": "0xd17347fa0a6eec89a226c96a9ae354f785e94241",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 27,
      "timestamp": "2024-07-13T14:45:59.000Z",
      "transactionHash": "0x001522c311d7fce1ffc94c36586a87c036a5ea6d8df7846dbb87e80c2bc09411",
      "blockNumber": "20298264",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0xd17347fa0a6eec89a226c96a9ae354f785e94241",
      "eventType": "addr",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "60",
            "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 28,
      "timestamp": "2024-10-30T19:50:35.000Z",
      "transactionHash": "0xb4755d5613568a3217e2b53d93f814d663678693b188a4731ed6aafd8b85d5b9",
      "blockNumber": "21080652",
      "name": "slobo.eth",
      "cumulativeRecords": [],
      "resolverChange": {
        "address": "0xa87361c4e58b619c390f469b9e6f27d759715125"
      },
      "resolverAddress": "0xa87361c4e58b619c390f469b9e6f27d759715125",
      "eventType": "resolver",
      "changes": {
        "added": [],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 29,
      "timestamp": "2024-10-30T20:04:11.000Z",
      "transactionHash": "0x499b37a9e26a8b927de6ebc25ec172816a7bd8eb5547f50466ace01255c15f3a",
      "blockNumber": "21080720",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0xa87361c4e58b619c390f469b9e6f27d759715125",
      "eventType": "addr",
      "changes": {
        "added": [
          {
            "type": "addr",
            "key": "60",
            "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
          }
        ],
        "updated": [],
        "deleted": []
      }
    },
    {
      "id": 30,
      "timestamp": "2025-02-06T15:58:11.000Z",
      "transactionHash": "0x062840d38766c7d734b3781618039848d1e65b8cece82e2c49a0912da4974b70",
      "blockNumber": "21788508",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x5D76fF3bD2735953e0Fae2C340fd1f07699Fe0e8",
          "rawValue": "0x5d76ff3bd2735953e0fae2c340fd1f07699fe0e8"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x5D76fF3bD2735953e0Fae2C340fd1f07699Fe0e8",
          "rawValue": "0x5d76ff3bd2735953e0fae2c340fd1f07699fe0e8"
        }
      ],
      "resolverAddress": "0xa87361c4e58b619c390f469b9e6f27d759715125",
      "eventType": "addr",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "addr",
            "key": "60",
            "value": "0x5D76fF3bD2735953e0Fae2C340fd1f07699Fe0e8",
            "rawValue": "0x5d76ff3bd2735953e0fae2c340fd1f07699fe0e8"
          }
        ],
        "deleted": []
      }
    },
    {
      "id": 31,
      "timestamp": "2025-02-06T15:58:59.000Z",
      "transactionHash": "0x27cfd3de9055a509a41fa7d2189301db9f4e205f56c340143b5cb24c9e799ece",
      "blockNumber": "21788512",
      "name": "slobo.eth",
      "currentUpdatedRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "cumulativeRecords": [
        {
          "type": "addr",
          "key": "60",
          "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
          "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
        }
      ],
      "resolverAddress": "0xa87361c4e58b619c390f469b9e6f27d759715125",
      "eventType": "addr",
      "changes": {
        "added": [],
        "updated": [
          {
            "type": "addr",
            "key": "60",
            "value": "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "rawValue": "0x534631bcf33bdb069fb20a93d2fdb9e4d4dd42cf"
          }
        ],
        "deleted": []
      }
    }
  ],
  resolverNames: [{
    resolverAddress: "0x828ec5bde537b8673af98d77bcb275ae1ca26d1f",
    contractName: "TheOffchainResolver"
  }, {
    resolverAddress: "0x231b0ee14048e9dccd1d247744d114a4eb5e8e63",
    contractName: "PublicResolver"
  },
  {
    resolverAddress: "0xd17347fa0a6eec89a226c96a9ae354f785e94241",
    contractName: "OwnedTOR"
  },
   {
    resolverAddress: "0x2291053f49cd008306b92f84a61c6a1bc9b5cb65",
    contractName: "OffchainResolver"
  },
   {
    resolverAddress: "0xa87361c4e58b619c390f469b9e6f27d759715125",
    contractName: "OwnedTOR"
  },

  ],
}
