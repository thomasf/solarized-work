# Just something simple for sketching color combinations
j = jQuery


parameters =
  brightness: 20

hexToColor = (o) ->

colors =
  base_light:
    fg:        0x839496
    bg:        0xfdf6e3
  base_dark:
    fg:        0x657b83
    bg:        0x002b36
  accent:
    yellow:    0xb58900
    orange:    0xcb4b16
    red:       0xdc322f
    magenta:   0xd33682
    violet:    0x6c71c4
    blue:      0x268bd2
    cyan:      0x2aa198
    green:     0x859900

for listName, colorList of colors
  for name, hex of colorList
    colorList[name] = new Hex(hex)
    console.log colorList, name, hex

ac = colors.accent


vc_colors = _.union ac.red,
  ac.red.range(ac.yellow, 4),
  ac.yellow,
  ac.yellow.range(ac.green, 6),
  ac.green,
  ac.green.range(ac.cyan, 6),
  ac.cyan,
  ac.cyan.range(ac.blue, 5),
  ac.blue

n = 0
vc_colors_string=""
for i, c of vc_colors
  n = n + 20
  vc_colors_string += "(" + n + ' . "#' + c.toString() + '")'


console.log vc_colors_string



# Color transforms
transform =
  brightness:
    up:   (color) -> color.brightness(20).toString()
    down: (color) -> color.brightness(-20).toString()
  interpolate:
    up:   (color) -> color.range(colors.base_light.bg, 23, true)[4].brightness(15).toString()
    down: (color) -> color.range(colors.base_dark.bg, 23, true)[4].brightness(-15).toString()
  interpolate2:
    up:   (color) -> color.range(colors.base_light.bg, 50, true)[8].brightness(10).toString()
    down: (color) -> color.range(colors.base_dark.bg, 50, true)[8].brightness(-10).toString()

# Defaults
base = colors.base_light
colorTransform = transform.brightness

c = (j '#content')


render = ->

  c.html ''

  (j 'body').css {
    "background-color": base.bg.toString()
    "color": colors.fg
    }


  box = (bg, fg, title="TEXT", colorCode=false) ->
    if colorCode
      colorCodes = "(#{fg} on #{bg})"
    else
      colorCodes = ""
    c.append """<div style='background-color:#{bg}; color: #{fg};' class='box'>
                  #{title} #{colorCodes}
                </div>
             """

  box2 = (outer, inner) ->
    c.append """
      <div style='background-color:#{outer};' class='box2-outer'>
      <div style='background-color:#{inner};' class='box2-inner'></div>
      </div> """

  elisp = ""
  for name, color of colors.accent

    c.append '<div style="clear:both">'
    normal = color.toString()
    hd = 0
    bd = 20
    light = colorTransform.up color
    dark =  colorTransform.down color
    #name = "#{name}"
    #
    for ccol in [dark, normal, light]
      c.append "<div style='clear:both'>"
      box2 ccol, dark
      box2 ccol, normal
      box2 ccol, light
      c.append "</div>"

    c.append "<div style='clear:both'>"
    box colors.bg, normal , "#{name}..."
    box colors.bg, light , "Light.."
    box colors.bg, dark , "Dark..."
    c.append "</div>"

    c.append "<div style='clear:both'>"
    box light, normal, "Normal on light."
    box dark, normal, "Normal on dark."
    box normal, light, "Light on normal"
    box normal, dark, "Dark on normal"
    c.append "</div>"

    c.append "<div style='clear:both'>"
    box light, dark, "Dark on light", true
    box dark, light, "Light on dark", true
    c.append "</div>"


    elisp = "#{elisp} (#{name}-d \"##{dark}\")<br>"
    elisp = "#{elisp} (#{name}-l \"##{light}\")<br>"

    c.append '</div>'

   c.append "<div style='clear:both;'><h1>elisp:</h1><code>#{elisp}</code></div>"



render()


dispatcher =
  light: ->
    base = colors.base_light
    render()
  dark: ->
    base = colors.base_dark
    render()
  brightness: ->
    colorTransform = transform.brightness
    render()
  interpolate: ->
    colorTransform = transform.interpolate
    render()
  interpolate2: ->
    colorTransform = transform.interpolate2
    render()


window.d = dispatcher


# Local Variables:
# eval: (coffee-cos-mode 1)
# End:
