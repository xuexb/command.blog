/**
 * @file command.blog
 * @author fe.xiaowu@gmail.com
 * @description 灵感来自52cik乱码 http://www.52cik.com/
 */

((window) => {
    'use strict';

    // 仅支持 chrome
    if (!window.chrome) {
        return false;
    }

    /**
     * 命令对象
     *
     * @type {Object}
     */
    var command = window.command = {};

    /**
     * 命令集
     *
     * @type {Object}
     */
    var cmd = command.cmd = {};

    /**
     * 控制台输出样式
     * @type {Object}
     */
    var styles = {
        pad: 'padding:115px;',

        blue: 'color:#369;',
        green: 'color:#360;',
        red: 'color:#A51A0C;',

        head: 'font-size:16px;font-weight:bold;',
        bold: 'font-weight:bold;'
    };

    /**
     * 帮助命令
     */
    cmd.help = () => {
        console.clear();

        console.log([
            '%c控制台操作命令:',
            '',
            '%chelp %c- %c显示帮助信息',
            '%cposts %c- %c列出所有文章',
            ].join('\n'), 
            styles.blue + styles.bold, 
            styles.green + styles.bold, styles.red, styles.blue, 
            styles.green + styles.bold, styles.red, styles.blue
        );
    };

    /**
     * 列出文章列表
     */
    cmd.posts = () => {
        let list = command.optioins.data;

        // 如果有文章
        if (list.length) {
            console.group('文章列表:');
            list.forEach((post) => {
                console.log(
                    '%c' + post.title + ' %c-> %c' + post.url,
                    styles.green + styles.bold, styles.red, styles.blue
                );
            });
            console. groupEnd();

            console.log('%c共 %c' + list.length + ' %c篇文章，点击链接即可打开。', styles.blue, styles.red, styles.blue);
        }
        else {
            console.log('%c当前没有文章～', styles.blue);
        }
    };

    // 1. 让控制台里可以直接输入命令
    // 2. 统一处理返回值
    Object.keys(cmd).forEach(key => {
        let old = cmd[key];
        cmd[key] = (...args) => {
            old(...args);
            return command.optioins.name;
        };
        cmd[key].toString = () => {
            return cmd[key]();
        };
    });

    /**
     * 创建控制台
     *
     * @description 会覆盖window[key]方法以具备在控制台内直接打命令运行
     * @param {Object}              optioins            配置对象
     * @param {Array|Function}      options.data        数据，如果是方法则认为返回Promise
     * @param {string}              options.name        名称，显示在每条结果的最后
     */
    command.create = (optioins = {}) => {
        // 合并默认参数
        command.optioins = Object.assign({}, command.defaults, optioins);

        // 如果数据是个方法，则认为是个promise
        if ('function' === typeof command.optioins.data) {
            console.log('%c加载数据中...', styles.blue + styles.bold);

            Promise.all([command.optioins.data()]).then((data) => {
                command.optioins.data = data[0];
                command._run();
            }, (err) => {
                throw new Error('加载数据出错');
            });
        }
        else if (Array.isArray(command.optioins.data)) {
            command._run();
        }
        else {
            throw new Error('optioins.data 不正确');
        }
    };

    /**
     * 运行
     */
    command._run = () => {
        Object.keys(cmd).forEach(key => {
            command['_' + key] = window[key];
            window[key] = cmd[key];
        });

        cmd.help();
    };

    /**
     * 恢复代码
     *
     * @description 将把之前覆盖的window[key]方法还原
     */
    command.noConflict = () => {
        Object.keys(cmd).forEach(key => {
            window[key] = command[key];
        });
    };

    /**
     * 默认参数
     *
     * @type {Object}
     */
    command.defaults = {
        name: 'command.blog',
        data: []
    };
})(window);
