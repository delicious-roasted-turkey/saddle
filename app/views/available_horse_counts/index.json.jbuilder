json.array! @available_horse_counts do |ahc|
  json.extract! ahc, *ahc.attributes.keys
end
