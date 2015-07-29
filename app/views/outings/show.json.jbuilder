json.partial! @outing
json.day do
  json.extract! @outing.day, *@outing.day.attributes.keys
end
