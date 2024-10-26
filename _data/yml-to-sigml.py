import yaml

with open('minisign-dict.yml') as f:
    signs = yaml.safe_load(f)

all_signs = [sign for sign in signs]

for sign in all_signs:
    tags = []

    for param in ['symm', 'shape', 'orient', 'constellation', 'loc', 'move']:
        if param in sign and sign[param] != None:
            tags += sign[param].split(',')

    tags = [tag if tag.startswith('ham') else 'ham' + tag for tag in tags]
    tags = [f"<{tag} />" for tag in tags]

    with open('./sigml/' + sign['gloss'] + '.xml', 'w') as f:
        f.write(
f'''
<?xml version="1.0" encoding="UTF-8"?>
<sigml>
    <hns_sign gloss="{sign['gloss']}">
        <hamnosys_manual>
{ '\n'.join(tags) }
        </hamnosys_manual>
    </hns_sign>
</sigml>'''.strip()
        )