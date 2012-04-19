// Generated by CoffeeScript 1.3.1
(function() {
  var base, c, colorList, colorTransform, colors, dispatcher, hex, hexToColor, j, listName, name, parameters, render, transform;

  j = jQuery;

  parameters = {
    brightness: 20
  };

  hexToColor = function(o) {};

  colors = {
    base_light: {
      fg: 0x839496,
      bg: 0xfdf6e3
    },
    base_dark: {
      fg: 0x657b83,
      bg: 0x002b36
    },
    accent: {
      yellow: 0xb58900,
      orange: 0xcb4b16,
      red: 0xdc322f,
      magenta: 0xd33682,
      violet: 0x6c71c4,
      blue: 0x268bd2,
      cyan: 0x2aa198,
      green: 0x859900
    }
  };

  for (listName in colors) {
    colorList = colors[listName];
    for (name in colorList) {
      hex = colorList[name];
      colorList[name] = new Hex(hex);
      console.log(colorList, name, hex);
    }
  }

  transform = {
    brightness: {
      up: function(color) {
        return color.brightness(20).toString();
      },
      down: function(color) {
        return color.brightness(-20).toString();
      }
    },
    interpolate: {
      up: function(color) {
        return color.range(colors.base_light.bg, 23, true)[4].brightness(15).toString();
      },
      down: function(color) {
        return color.range(colors.base_dark.bg, 23, true)[4].brightness(-15).toString();
      }
    },
    interpolate2: {
      up: function(color) {
        return color.range(colors.base_light.bg, 50, true)[8].brightness(10).toString();
      },
      down: function(color) {
        return color.range(colors.base_dark.bg, 50, true)[8].brightness(-10).toString();
      }
    }
  };

  base = colors.base_light;

  colorTransform = transform.brightness;

  c = j('#content');

  render = function() {
    var bd, box, box2, ccol, color, dark, elisp, hd, light, name, normal, _i, _len, _ref, _ref1;
    c.html('');
    (j('body')).css({
      "background-color": base.bg.toString(),
      "color": colors.fg
    });
    box = function(bg, fg, title, colorCode) {
      var colorCodes;
      if (title == null) {
        title = "TEXT";
      }
      if (colorCode == null) {
        colorCode = false;
      }
      if (colorCode) {
        colorCodes = "(" + fg + " on " + bg + ")";
      } else {
        colorCodes = "";
      }
      return c.append("<div style='background-color:" + bg + "; color: " + fg + ";' class='box'>\n  " + title + " " + colorCodes + "\n</div>");
    };
    box2 = function(outer, inner) {
      return c.append("<div style='background-color:" + outer + ";' class='box2-outer'>\n<div style='background-color:" + inner + ";' class='box2-inner'></div>\n</div> ");
    };
    elisp = "";
    _ref = colors.accent;
    for (name in _ref) {
      color = _ref[name];
      c.append('<div style="clear:both">');
      normal = color.toString();
      hd = 0;
      bd = 20;
      light = colorTransform.up(color);
      dark = colorTransform.down(color);
      _ref1 = [dark, normal, light];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        ccol = _ref1[_i];
        c.append("<div style='clear:both'>");
        box2(ccol, dark);
        box2(ccol, normal);
        box2(ccol, light);
        c.append("</div>");
      }
      c.append("<div style='clear:both'>");
      box(colors.bg, normal, "" + name + "...");
      box(colors.bg, light, "Light..");
      box(colors.bg, dark, "Dark...");
      c.append("</div>");
      c.append("<div style='clear:both'>");
      box(light, normal, "Normal on light.");
      box(dark, normal, "Normal on dark.");
      box(normal, light, "Light on normal");
      box(normal, dark, "Dark on normal");
      c.append("</div>");
      c.append("<div style='clear:both'>");
      box(light, dark, "Dark on light", true);
      box(dark, light, "Light on dark", true);
      c.append("</div>");
      elisp = "" + elisp + " (" + name + "-d \"#" + dark + "\")<br>";
      elisp = "" + elisp + " (" + name + "-l \"#" + light + "\")<br>";
      c.append('</div>');
    }
    return c.append("<div style='clear:both;'><h1>elisp:</h1><code>" + elisp + "</code></div>");
  };

  render();

  dispatcher = {
    light: function() {
      base = colors.base_light;
      return render();
    },
    dark: function() {
      base = colors.base_dark;
      return render();
    },
    brightness: function() {
      colorTransform = transform.brightness;
      return render();
    },
    interpolate: function() {
      colorTransform = transform.interpolate;
      return render();
    },
    interpolate2: function() {
      colorTransform = transform.interpolate2;
      return render();
    }
  };

  window.d = dispatcher;

}).call(this);