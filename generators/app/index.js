'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stupendous ${chalk.red('generator-lins-cli')} generator!`
      )
    );

    const prompts = [
      {
        type:'input',
        name:'dirName',
        message:'please enter the directory name for your project',
        default:'vue-cli-template',
        validate:dirName => {
          if(dirName.length < 1) {
            return '⚠️  directory name must not be null！'
          }
          return true
        }
      },
      {
        type:'input',
        name:'author',
        message:"please enter author's name",
        default:""
      },
      {
        type:'input',
        name:'email',
        message:'please enter your email'
      },
      {
        type:'input',
        name:'license',
        message:'please enter license',
        default:''
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  // 初始化
  initialzing() {
    const version = require('../../package.json').version;
    console.log("version",version);
  }

  writing() {
    this.log("\nWriting...\n");

    const templates = [
      'public/index.html',
      'public/favicon.ico',
      'src/api/handleError.js',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/config/index.js',
      'src/router/index.js',
      'src/store/index.js',
      'src/views/AboutView.vue',
      'src/views/HomeView.vue',
      'src/App.vue',
      'src/main.js',
      '.browserslistrc',
      '.editorconfig',
      '.eslintrc.js',
      '.gitignore',
      'babel.config.js',
      'jsconfig.json',
      'lint-staged.config.js',
      'package.json',
      'postcss.config.js',
      'README.md',
      'vue.config.js',
    ]
    templates.forEach(item =>{
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(`${this.props.dirName}/${item}`),
        {
          dirName:this.props.dirName,
          author:this.props.author,
          email:this.props.email,
          license:this.props.license
        }
      )
    })
  }

  install() {
    // this.installDependencies();
  }
  end() {
    this.log('destinationPath',this.destinationPath())
    this.log('destinationRoot',this.destinationRoot())
    this.log('sourceRoot',this.sourceRoot())
  }
};
