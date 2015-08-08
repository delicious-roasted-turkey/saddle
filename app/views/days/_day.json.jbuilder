json.extract! day, *day.attributes.keys
json.outings day.outings do |outing|
  json.partial! 'outings/outing_with_reservations', outing: outing
end
