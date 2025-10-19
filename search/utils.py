def results_to_json(result_list) -> list:

    json_result = []

    for item in result_list:

        if item.model_type() == 'Product':
            json_result.append(
                {
                    'name': item.name,
                    'description': item.description,
                    'price': item.price,
                    'model_type': 'Product',
                    'url': item.get_absolute_url(),
                }
            )
        else:
            json_result.append(
                {
                    'title': item.title,
                    'description': item.description,
                    'start_event': item.start_event,
                    'finish_event': item.finish_event,
                    'model_type': 'Event',
                    'url': item.get_absolute_url() ,
                }
            )

    return json_result