import CryptoJS from 'crypto-js';
export default class Crypto {
    constructor() {
        this.keySize = 128;
    }

    genKey(rawKey) {
        return CryptoJS.enc.Utf8.parse(this.fillKey(rawKey));
    }

    /**
     * 生成密钥字节数组, 原始密钥字符串不足128位, 补填0.
     * @param {string} key - 原始 key 值
     * @return Buffer
     */
    fillKey(key) {
        const filledKey = Buffer.alloc(this.keySize / 8);
        const keys = Buffer.from(key);
        if (keys.length < filledKey.length) {
            filledKey.map((b, i) => filledKey[i] = keys[i]);
        }
        console.log(filledKey.length)
        return filledKey;
    }

    /**
     * 定义加密函数
     * @param {string} data - 需要加密的数据, 传过来前先进行 JSON.stringify(data);
     * @param {string} key - 加密使用的 key
     */
    aesEncrypt(data, key) {
        /**
         * CipherOption, 加密的一些选项:
         *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
         *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
         *   iv: 偏移量, mode === ECB 时, 不需要 iv
         * 返回的是一个加密对象
         */
        const cipher = CryptoJS.AES.encrypt(data, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            iv: '',
        });
        // 将加密后的数据转换成 Base64
        const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
        // 处理 Android 某些低版的BUG
        const resultCipher = base64Cipher.replace(/\+/g, '-').replace(/\//g, '_');
        // 返回加密后的经过处理的 Base64
        return resultCipher;
    }

    /**
     * 定义解密函数
     * @param {string} encrypted - 加密的数据;
     * @param {string} key - 加密使用的 key
     */
    aesDecrypt(encrypted, key) {
        // 先将 Base64 还原一下, 因为加密的时候做了一些字符的替换
        const restoreBase64 = encrypted.replace(/\-/g, '+').replace(/_/g, '/');
        // 这里 mode, padding, iv 一定要跟加密的时候完全一样
        // 返回的是一个解密后的对象
        const decipher = CryptoJS.AES.decrypt(restoreBase64, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            iv: '',
        });
        // 将解密对象转换成 UTF8 的字符串
        const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
        // 返回解密结果
        return resultDecipher;
    }
}

// let aa = new Crypto();
// let key = aa.genKey('mykey');
// let encode = aa.aesEncrypt('mypassword', key);
// let desCode = aa.aesDecrypt(encode, key)
// console.log(encode, desCode);