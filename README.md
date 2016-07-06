# fis3-parser-rem

fis3 对px单位的css属性自动转化为rem为单位的fis插件。

-----------------
    - 使用node-css把css解析后,对px为单位对属性进行rem转换处理。
    - 对文字进行特殊处理追加至产出的css文件之后。
    - developer只用专注开发,配置灵活方便, 对原始文件无侵入。
---------------------------------------

## flexible.js
默认可以配合淘宝的[flexible.js](https://github.com/amfe/lib-flexible)使用

## fis配置

```javascript
fis.match('*.css', {
    parser: fis.plugin('rem', {
        dpr: 1,
        exclude: ['background-size']
    })
})
```


## Usage

* 需要在css文件头部声明/*!@userem*/

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
- dpr `{!Number}` 1, 2, 3 如设计稿的尺寸为
    *320-375 那么dpr为1 
    *640-720 那么dpr为2 


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

## 关于原始值
    -v0.0.8添加可以看到rem的原始值
```css
    margin: 0.6668rem/* @source-size: 25px; */ 0;
```

## changelog

<table>
    <thead>
        <tr>
            <th>版本</th>
            <th>类型</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody> 
        <tr>
            <td>v0.0.8</td>
            <td>Feature</td>
            <td>添加原始值</td>
        </tr>
        <tr>
            <td>v0.0.7</td>
            <td>Bugfixed</td>
            <td>全局选择器问题</td>
        </tr>
    </tbody>
</table>