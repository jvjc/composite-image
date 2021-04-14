## Lambda para insertar el número de pedido en la imagen personalizada

### Requisitos
- Node 14.x

### Todos los parámetros de la lambda
```bash
Usage: entry [options]

Options:
  -V, --version                    output the version number
  --input <url or local file>      input image
  --watermark <url or local file>  watermark image
  --position <position>            watermark position
                                   [center|centre|north|east|south|west|northeast|southeast|southwest|northwest]
  --composite <position>           watermark position
                                   [clear|source|over|in|out|atop|dest|dest-over|dest-in|dest-out|dest-atop|xor|add|saturate|multiply|screen
                                   |overlay|darken|lighten|colour-dodge|color-dodge|colour-burn,color-burn|hard-light|soft-light|difference|exclusion]
  --width <pixels>                 watermark width
  --height <pixels>                watermark height
  --angle <degrees>                watermark angle
  --vars <json>                    watermark replaceable vars, only works in svg input files
  --output <path>                  output path
  -h, --help                       display help for command
```

Example image by <a href="https://pixabay.com/es/users/vetonethemi-2216012/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1255520">Veton Ethemi</a> from <a href="https://pixabay.com/es/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1255520">Pixabay</a>

Example image by <a href="https://pixabay.com/es/users/gorartser-6190330/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2675672">Artsiom Horsky</a> from <a href="https://pixabay.com/es/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2675672">Pixabay</a>
