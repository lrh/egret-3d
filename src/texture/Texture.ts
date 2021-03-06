﻿module egret3d {

    /**
    * @class egret3d.MimapTexture
    * @classdesc
    * Texture 贴图对象
    * dds tga hdr 几种贴图的格式加载后会生成的对象
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Texture extends ITexture {

        /**
        * @language zh_CN
        * 构造函数
        * 默认是平滑采样
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.smooth = true;
            this.texture2D = new ContextTexture2D();
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public upload(context3D: Context3DProxy) {
            if (!this.texture2D.textureBuffer) {
                this.texture2D.textureBuffer = this.texture2D.textureBuffer || context3D.creatTexture();
                this.texture2D.internalFormat = this.internalFormat;
                this.texture2D.colorFormat = this.colorFormat;
                this.texture2D.mimapData = this.mimapData;
                this.texture2D.dataFormat = Context3DProxy.gl.UNSIGNED_BYTE;
                if (this.mimapData && this.mimapData.length > 0) {
                    for (var i: number = 0; i < this.mimapData.length; i++) {
                        context3D.upLoadTextureData(i, this);
                    }
                }
                else {
                    context3D.upLoadTextureData(0, this);
                }
                if(this.parentTexture) {
                    if (!this.parentTexture.texture2D) {
                        this.parentTexture.upload(context3D);
                    }
                    this.texture2D = this.parentTexture.texture2D;
                    this.texture2D.internalFormat = this.parentTexture.internalFormat;
                    this.texture2D.colorFormat = this.parentTexture.colorFormat;
                    this.texture2D.mimapData = this.parentTexture.mimapData;
                }
            }
     
        }

        /**
        * @language zh_CN
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public uploadForcing(context3D: Context3DProxy) {
            context3D.upLoadTextureData(0, this);
        }
    }
}