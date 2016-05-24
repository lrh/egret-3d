﻿module egret3d {
                            
    /**
    * @private
    * @class egret3d.SphereSky
    * @classdesc
    * default render
    * 把所有需要渲染的对象，依次进行渲染
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ShadowRender extends RenderBase {
              
        private _renderItem: IRender; 

        private _i: number = 0;

        /**
        * @language zh_CN
        * constructor
        */
        constructor() {
            super();
        }

        public update(time: number, delay: number, collect: CollectBase, camera: Camera3D) {
            //this._numEntity = collect.renderList.length;
            //for (this._renderIndex = 0; this._renderIndex < this._numEntity; this._renderIndex++) {
            //    this._renderItem = collect.renderList[this._renderIndex];
            //    this._renderItem.update(time, delay, camera);
            //}
        }

        /**
        * @language zh_CN
        * 把所有需要渲染的对象，依次进行渲染
        * @param time 当前时间
        * @param delay 每帧间隔时间
        * @param context3D 设备上下文
        * @param collect 渲染对象收集器
        * @param camera 渲染时的相机
        */
        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, camera: Camera3D, backViewPort:Rectangle = null ) {
            this.numEntity = collect.renderList.length;

            if (this.renderTexture) {
                this.renderTexture.upload(context3D);
                context3D.setRenderToTexture(this.renderTexture.texture2D, true, 0);

            }
            for (this._renderIndex = 0; this._renderIndex < this.numEntity; this._renderIndex++) {
                this._renderItem = collect.renderList[this._renderIndex];
                            
                this._renderItem.geometry.update(time, delay, context3D, camera);

                if (this._renderItem.animation) {
                    this._renderItem.animation.update(time, delay, this._renderItem.geometry, null, context3D);
                }

                if (this._renderItem.geometry.subGeometrys.length <= 0) {
                    this._renderItem.geometry.buildDefaultSubGeometry();
                }

                for (this._i = 0; this._i < this._renderItem.geometry.subGeometrys.length; this._i++) {
                    var subGeometry = this._renderItem.geometry.subGeometrys[this._i];
                    var matID = subGeometry.matID;
                    if (this._renderItem.multiMaterial[matID]) {
                        if (this._renderItem.multiMaterial[matID].shadowPass)
                            this._renderItem.multiMaterial[matID].shadowPass.draw(time, delay, context3D, this._renderItem.modelMatrix, camera, subGeometry, this._renderItem.animation);
                    }
                    else {
                        if (this._renderItem.multiMaterial[matID].shadowPass)
                            this._renderItem.multiMaterial[0].shadowPass.draw(time, delay, context3D, this._renderItem.modelMatrix, camera, subGeometry, this._renderItem.animation);
                    }
                }
            }

            if (this.renderTexture) {
                context3D.setRenderToBackBuffer();

                context3D.viewPort(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
                context3D.setScissorRectangle(backViewPort.x, backViewPort.y, backViewPort.width, backViewPort.height);
            }
        }
    }
} 
