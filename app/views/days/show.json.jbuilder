json.extract! @day, *@day.attributes.keys
json.outings @day.outings do |outing|
  json.partial! outing
end