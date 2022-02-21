"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SHA1 = require("crypto-js/sha1");
var SHA256 = require("crypto-js/sha256");
var MD5 = require("crypto-js/md5");

require("isomorphic-fetch");

module.exports = function () {
  function FlatIronCyber(apiKey) {
    _classCallCheck(this, FlatIronCyber);

    this.apiKey = apiKey || null;
    this.endpoint = "https://wl7r41nzm9.execute-api.us-east-1.amazonaws.com/staging/check";
  }

  _createClass(FlatIronCyber, [{
    key: "check",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
        var payload, options, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // sanitize
                if (typeof email === "string" && email !== "") {
                  email = email.trim();
                }

                // validate

                if (!(email === null)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", { message: "Invalid email", success: false });

              case 3:
                if (!(password === null)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", { message: "Invalid password", success: false });

              case 5:
                if (!(this.apiKey === null)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", { message: "Invalid API key", success: false });

              case 7:

                // prep data
                payload = {
                  email: email,
                  password: {
                    SHA1: SHA1(password).toString(),
                    SHA256: SHA256(password).toString(),
                    MD5: MD5(password).toString()
                  }
                };
                options = {
                  method: "POST",
                  body: JSON.stringify(payload),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.apiKey
                  }
                };
                response = void 0;
                _context.prev = 10;
                _context.next = 13;
                return fetch(this.endpoint, options);

              case 13:
                response = _context.sent;
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](10);

                response = null;

              case 19:
                if (!(response === null)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", {
                  success: false,
                  message: "Unknown error occured!"
                });

              case 21:
                _context.next = 23;
                return response.json();

              case 23:
                return _context.abrupt("return", _context.sent);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 16]]);
      }));

      function check(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return check;
    }()
  }, {
    key: "setApiKey",
    value: function setApiKey(apiKey) {
      this.apiKey = apiKey;
    }
  }]);

  return FlatIronCyber;
}();