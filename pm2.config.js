module.exports = {
  apps : [
    {
      name: 'pega-cupom',
      script: './index.js',
      watch: false,
      instances: 'max',
      // max_memory_restart : '3G',
      ignore_watch: ['.git', 'node_modules', 'tmp', 'data'],
      node_args : [
        '--stack_size=6144',
        '--max-old-space-size=6144',
        '--expose-gc'
      ]
    }
  ]
};
