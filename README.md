# fis3-parser-rem

fis3 px自动转化成rem插件
-----------------
    - 特别鸣谢fis-parser-rem, 使用过程中发现css或其衍生文件中的注释有问题就会导致编译失败,所以我放弃了用正则查找替换的方式。
    - 使用node-css把文件反序列化后,进行处理这样就避免了这些问题。
    - 需要注意的是该插件要配置在css预处理器只后, 压缩打包之前的阶段。
----------------------------------------
## fis配置

```javascript
fis.match('*.css', {
    parser: [ 
        fis.plugin('rem')
    ]
})
```


## Usage

* 需要在css文件头部声明/*@userem*/

```css
body {
    border-top: 1px;
    border-bottom: 10px;
    padding: 10px; /* @norem */
    background-size: 10px 10px; /* @rem */
}
```

输出:

```css
body {
    border-top: 1px;
    border-bottom: 0.5557rem;
    padding: 10px;
    background-size: 0.5557rem 0.5557rem;
}
```

## Option

- rem `{Number}` 1rem=多少px `default` 18
- min `{Number}` 最小转化值 `default` 3
- exclude `{Array.<String>}` 忽略的样式 `default` `['width', 'height', 'background', 'background-size']`
- type `{?default}` 支持[flexible](https://github.com/amfe/lib-flexible)


## about font-size
- 对font-size进行了特殊处理,没有使用rem而是根据dpi输出三种大小字体

### type: default 

```css
@media(-webkit-min-device-pixel-ratio: 2) {    
    .course-name {
        font-size: 36px ;
    }
}
@media(-webkit-min-device-pixel-ratio: 3) {
    .course-name {
        font-size: 54px ;
    }
}
```

### type: null
```
[data-dpr="1"] .course-name {
    font-size: 18px; 
}
[data-dpr="2"] .course-name {
    font-size: 36px; 
}
[data-dpr="3"] .course-name {
    font-size: 54px; 
}
```
