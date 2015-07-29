json.extract! outing, *outing.attributes.keys
json.reservations outing.reservations do |reservation|
  json.partial! reservation
end
