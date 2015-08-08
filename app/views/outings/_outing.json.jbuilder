json.extract! outing, *outing.attributes.keys
json.confirmed outing.confirmed?

# If the outing is not persisted, give it an id of 0
json.id 0 if !outing.id
