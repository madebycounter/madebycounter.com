class ContentCloud {
    private _data: any;

    public id: string;
    public maxWidth: number;
    public mobileWidth: number;
    public items: any[];
    public elem: JQuery<HTMLElement>;

    constructor(data: any) {
        this._data = data;
        this.id = data.id;
        this.maxWidth = data.maxWidth;
        this.mobileWidth = data.mobileWidth;
        this.items = data.items;
        this.elem = $(`#${data.id}`);

        this.generate();
        this.bind();
    }

    generate() {
        this.elem.empty();
        this.elem.addClass("contentcloud");

        for (let idx in this.items) {
            let item = this.items[idx];
            let html = "";

            if (item.video) {
                html = this.createVideo(item.id, item.video);
            }

            if (item.image) {
                html = this.createImage(item.id, item.image);
            }

            this.elem.append(`
                    <div
                        class="contentcloud-item"
                        id="${this.id}_${item.id}">
                        ${html}
                    </div>
                `);
        }
    }

    bind() {
        var cloud = this;
        var resizeHandler = () => {
            cloud.position();
        };

        $(window).on("resize", resizeHandler);
        $(window).on("load", resizeHandler);
        $(`.cloudcontent-video-${cloud.id}`).on("play", resizeHandler);
        $(`.cloudcontent-image-${cloud.id}`).on("load", resizeHandler);
    }

    position() {
        var parentWidth = this.elem.parent().width();
        var containerWidth = parentWidth;
        if (parentWidth >= this.maxWidth) {
            containerWidth = this.maxWidth;
        }

        this.elem.width(containerWidth);

        if (containerWidth > this.mobileWidth) {
            var scaler = containerWidth / 100;
            var maxHeight = 0;

            for (let idx in this.items) {
                let item = this.items[idx];
                let itemElem = $(`#${this.id}_${item.id}`);
                let top = item.position.y * scaler;

                $(itemElem).width(scaler * item.width);
                $(itemElem).css("left", item.position.x * scaler);
                $(itemElem).css("top", top);
                $(itemElem).css("z-index", item.position.z);

                let calculatedHeight = $(itemElem).height();
                let bottomHeight = calculatedHeight + top;

                if (bottomHeight > maxHeight) {
                    maxHeight = bottomHeight;
                }
            }

            this.elem.removeClass("cloudcontent-mobile");
            this.elem.addClass("contentcloud-desktop");
            this.elem.height(maxHeight);
        } else {
            for (let idx in this.items) {
                let item = this.items[idx];
                let itemElem = $(`#${this.id}_${item.id}`);

                $(itemElem).width("100%");
                $(itemElem).css("left", "");
                $(itemElem).css("top", "");
                $(itemElem).css("z-index", "");
            }

            this.elem.removeClass("contentcloud-desktop");
            this.elem.addClass("cloudcontent-mobile");
            this.elem.height("auto");
        }
    }

    createImage(id: string, source: string) {
        return `<img
                        class="contentcloud-video cloudcontent-video-${this.id}"
                        id="${this.id}_${id}_media"
                        src="${source}"
                    />`;
    }

    createVideo(id: string, sources: any[]) {
        var srcHtml = "";

        for (let idx in sources) {
            let source = sources[idx];
            srcHtml += `<source
                                src="${source.path}"
                                type="${source.format}"
                            />`;
        }

        return `<video disableRemotePlayback playsInline
                        class="contentcloud-image cloudcontent-image-${this.id}"
                        id="${this.id}_${id}_media"
                        autoplay loop muted>
                        ${srcHtml}
                    </video>`;
    }
}
