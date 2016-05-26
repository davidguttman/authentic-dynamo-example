var _ = require('lodash')
var SparkPost = require('sparkpost')

var key = 'xxx'
var client = new SparkPost(key)

module.exports = function sendEmail (opts, cb) {
  opts.to = opts.email
  opts.from = 'Support <support@domain.com>'

  if (opts.type === 'signup') return sendSignup(opts, cb)
  if (opts.type === 'change-password-request') return sendReset(opts, cb)

  return cb(new Error('Unknown email type'))
}

function sendSignup (opts, cb) {
  var bodyTemplate = _.template(opts.bodyTemplate || '')

  opts.subject = opts.subject || 'Confirm Your Account'
  opts.html = bodyTemplate(opts)

  send(opts, cb)
}

function sendReset (opts, cb) {
  var bodyTemplate = _.template(opts.bodyTemplate || '')

  opts.subject = opts.subject || 'Password Change'
  opts.html = bodyTemplate(opts)

  send(opts, cb)
}

function send (opts, cb) {
  var reqOpts = defaults()
  _.set(reqOpts, 'transmissionBody.recipients[0].address.email', opts.to)
  _.set(reqOpts, 'transmissionBody.content.subject', opts.subject)
  _.set(reqOpts, 'transmissionBody.content.html', opts.html)

  client.transmissions.send(reqOpts, cb)
}

function defaults () {
  return {
    transmissionBody: {
      options: {
        open_tracking: true,
        click_tracking: false
      },
      campaign_id: 'some-campaign',
      recipients: [ { address: { email: null } } ],
      content: {
        from: {
          name: 'Support',
          email: 'support@domain.com'
        },
        subject: null,
        reply_to: 'Support <support@domain.com>',
        html: null
      }
    }
  }
}
