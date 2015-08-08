json.partial! 'outings/outing_with_reservations', outing: @outing
json.day do
  json.extract! @outing.day, *@outing.day.attributes.keys
end
