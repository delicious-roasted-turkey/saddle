json.extract! outing, *outing.attributes.keys
json.confirmed outing.confirmed?
json.free_places outing.free_places
json.num_available_horses outing.num_available_horses
json.num_available_horses_at_date outing.num_available_horses_at_date
json.taken_places outing.taken_places

# If the outing is not persisted, give it an id of 0
json.id 0 if !outing.id
